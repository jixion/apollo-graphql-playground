const {gql} = require("apollo-server");

const neoType = gql`
  type NEO_BODY {
    id: String!
    name: String!
    is_potentially_hazardous_asteroid: Boolean!
  } 
  
  type Query {
    neos: [NEO_BODY]
  }
`

async function neos(_, __, { dataSources }) {
  return dataSources.nasaAPI.getNEOs().then(data => {
    return data["near_earth_objects"][new Date().toISOString().substr(0,10)];
  })
}

module.exports = { neoType, neos };