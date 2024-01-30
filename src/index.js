const { ApolloServer } = require('apollo-server');

const { typeDefs } = require('./typedefs');
const { resolvers } = require('./resolvers');
const { NASAAPI, ISSAPI, COTDBAPI, OWMAPI } = require('./datasources');

// Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        issAPI: new ISSAPI(),
        nasaAPI: new NASAAPI(),
        cotdbAPI: new COTDBAPI(),
        owmAPI: new OWMAPI()
    }) 
});

// Launch the server
server.listen(process.env.PORT || 5000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
