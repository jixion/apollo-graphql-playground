const { gql } = require("apollo-server");
const { mergeTypeDefs } = require('graphql-tools');

const { neoType } = require('../neoApi');
const { apodType } = require('../apodApi');
const { issLocationsType } = require('../issLocationsApi');
const { issSatellitesType } = require('../issSatellitesApi');
const { cardsType } = require('../cotdbApi');

const typeDefs = mergeTypeDefs([neoType, apodType, issLocationsType, issSatellitesType, cardsType]);

exports.typeDefs = typeDefs;