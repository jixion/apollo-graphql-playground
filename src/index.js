const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
    ApolloServerPluginDrainHttpServer
} = require('apollo-server-core');
const http = require('http');
const cors = require('cors');

const { typeDefs } = require('./typedefs');
const { resolvers } = require('./resolvers');
const { NASAAPI, ISSAPI, COTDBAPI, OWMAPI } = require('./datasources');

function authenticateAppEngineService(req, res, next) {
    if (req.headers.origin.endsWith("localhost:3001") || req.headers.origin.endsWith('aqueous-cargo-415820.uc.r.appspot.com') || req.headers.origin.endsWith('jixion.com')) {
        next(); // Allow the request
    } else {
        res.status(403).send('Forbidden: Access denied.');
    }
}

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
        playground: process.env.NODE_ENV !== 'production',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    const allowedOrigins = [
        'https://v2-dot-aqueous-cargo-415820.uc.r.appspot.com',
        'https://www.jixion.com',
        'http://localhost:3001',
    ];

    const corsOptions = {
        origin: function (origin, callback) {
            if (
                !origin ||
                allowedOrigins.indexOf(origin) !== -1 ||
                origin.endsWith('aqueous-cargo-415820.uc.r.appspot.com') ||
                origin.endsWith('jixion.com') ||
                origin.endsWith('localhost:3001')
            ) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Appengine-Service-Account'],
    };

    app.use(cors(corsOptions));

    app.use('/', authenticateAppEngineService, express.json(), server.getMiddleware({
        path: '/',
    }));

    app.get('/health', (req, res) => {
        res.status(200).send('GraphQL server is running.');
    });

    const PORT = process.env.PORT || 5000;
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
}

startApolloServer(typeDefs, resolvers);