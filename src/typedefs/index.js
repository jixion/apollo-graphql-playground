const { gql } = require("apollo-server");
const { mergeTypeDefs } = require('@graphql-tools/merge');

const { neoType } = require('../neoApi');
const { apodType } = require('../apodApi');
const { issLocationsType } = require('../issLocationsApi');
const { issSatellitesType } = require('../issSatellitesApi');
const { cardsType } = require('../cotdbApi');
const { owmType } = require('../owmApi');

const typeDefs = mergeTypeDefs([neoType, apodType, issLocationsType, issSatellitesType, cardsType, owmType]);

exports.typeDefs = typeDefs;