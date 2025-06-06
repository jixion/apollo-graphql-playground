const express = require('express'); // <-- Add express
const { ApolloServer } = require('apollo-server-express'); // <-- Change to apollo-server-express
const {
    ApolloServerPluginDrainHttpServer
} = require('apollo-server-core'); // For graceful shutdown
const http = require('http'); // For http server

const { typeDefs } = require('./typedefs');
const { resolvers } = require('./resolvers');
const { NASAAPI, ISSAPI, COTDBAPI, OWMAPI } = require('./datasources');

// --- START Recommended Backend Code Modification ---

// Get the service account of your frontend App Engine app
// IMPORTANT: Replace 'your-frontend-app-service-account@your-gcp-project-id.iam.gserviceaccount.com'
// with the actual service account email of your frontend App Engine application.
// You can make this an environment variable for better management.
const ALLOWED_FRONTEND_SERVICE_ACCOUNT = process.env.FRONTEND_SERVICE_ACCOUNT_EMAIL || 'your-frontend-app-service-account@your-gcp-project-id.iam.gserviceaccount.com';

// Middleware to check the X-Appengine-Service-Account header
function authenticateAppEngineService(req, res, next) {
    const callingServiceAccount = req.headers['x-appengine-service-account'];
    console.log(`Received request from service account: ${callingServiceAccount}`);

    if (callingServiceAccount === ALLOWED_FRONTEND_SERVICE_ACCOUNT) {
        console.log('Access granted to frontend service account.');
        next(); // Allow the request
    } else {
        console.warn(`Unauthorized access attempt from service account: ${callingServiceAccount || 'None'}`);
        res.status(403).send('Forbidden: Access denied.');
    }
}

// --- END Recommended Backend Code Modification ---

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            issAPI: new ISSAPI(),
            nasaAPI: new NASAAPI(),
            cotdbAPI: new COTDBAPI(),
            owmAPI: new OWMAPI()
        }),
        // Ensure playground is disabled in production
        playground: process.env.NODE_ENV !== 'production', // Keep playground for development, disable in production
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    // Apply the authentication middleware before the Apollo Server middleware
    // This assumes your GraphQL endpoint is at '/graphql'. Adjust if different.
    app.use('/', authenticateAppEngineService, express.json(), server.getMiddleware({
        path: '/',
    }));

    // For health checks or other simple endpoints that don't need GraphQL access
    app.get('/health', (req, res) => {
        res.status(200).send('GraphQL server is running.');
    });

    const PORT = process.env.PORT || 5000;
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`To access, ensure X-Appengine-Service-Account is set to: ${ALLOWED_FRONTEND_SERVICE_ACCOUNT}`);
}

startApolloServer(typeDefs, resolvers);