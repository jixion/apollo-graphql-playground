const {gql} = require("apollo-server");

const issLocationsType = gql`
  type Location {
    name: String!
    id: Int!
    latitude: Float!
    longitude: Float!
    altitude: Float!
    velocity: Float!
    visibility: String!
    timestamp: Int!
  }
  
  type Query {
    issLocations(limit: Int): [Location]
  }
`;

async function issLocations(_, __, { dataSources }) {
    return dataSources.issAPI.getLocations(__.limit);
}

module.exports = {issLocationsType, issLocations};