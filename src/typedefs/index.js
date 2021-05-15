const { gql } = require("apollo-server");

const typeDefs = gql`
  type Satellite {
    name: String!
    id: Int!
  }
  
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
  
  type APOD {
    copyright: String!
    date: String!
    explanation: String!
    hdurl: String!
    media_type: String!
    service_version: String!
    title: String!
    url: String!
  }
  
  type NEO_BODY {
    id: String!
    name: String!
    is_potentially_hazardous_asteroid: Boolean!
  }
  
  type CARD {
    id: Int!,
    description: String!,
    status: String!,
    title: String!,
    username: String!,
    order: Int!
  }

  # Queries can fetch a list of libraries
  type Query {
    satellites: [Satellite]
    locations: [Location]
    neos: [NEO_BODY]
    apod: APOD
    cards: [CARD]
  }
`;

exports.typeDefs = typeDefs;