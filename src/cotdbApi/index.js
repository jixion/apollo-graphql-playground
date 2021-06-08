const {gql} = require("apollo-server");

const cardsType = gql`
  type CARD {
    id: Int!,
    description: String!,
    status: String!,
    title: String!,
    username: String!,
    order: Int
  }

  type Query {
    cards(user: String!): [CARD]
  }
`;

async function cards(_, { user, limit }, { dataSources }) {
    return dataSources.cotdbAPI.getCards(user, limit);
}

module.exports = {cardsType, cards};