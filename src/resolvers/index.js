const { ApolloServer } = require('apollo-server');
const { mergeTypeDefs } = require('@graphql-tools/merge');

const { neos } = require('../neoApi');
const { apod } = require('../apodApi');
const { issLocations } = require('../issLocationsApi');
const { issSatellites } = require('../issSatellitesApi');
const { cards } = require('../cotdbApi');
const { owm } = require('../owmApi');

const resolvers = {
    Query: {
        neos,
        apod,
        issLocations,
        issSatellites,
        cards,
        owm
    },
};

exports.resolvers = resolvers;