const {gql} = require("apollo-server");

const issSatellitesType = gql`
  type Satellite {
    name: String!
    id: Int!
  }
  
  type Query {
    issSatellites: [Satellite]
  }
`;

async function issSatellites(_, __, { dataSources }) {
    return dataSources.issAPI.getSatellites(__.limit);
}

module.exports = {issSatellitesType, issSatellites};