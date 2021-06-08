const {gql} = require("apollo-server");

const apodType = gql`
  type APOD {
    copyright: String
    date: String!
      explanation: String!
      hdurl: String!
      media_type: String!
      service_version: String!
      title: String!
      url: String!
  }
  
  type Query {
    apod: APOD
  }
`;

async function apod(_, __, { dataSources }) {
  return dataSources.nasaAPI.getApod();
}

module.exports = {apodType, apod};