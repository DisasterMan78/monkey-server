// const { gql } = require('apollo-server');

const typeDefs = `

  type User {
    id: Int!
    name: String!
    email: String!
    collection: [Collection!]!
  }

  type Collection {
    id: Int!
    minifigId: Int!
    count: Int!
    userId: User!
  }

  type Query {
    user(id: Int!): User
    collection(userId: Int!): [Collection]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!

    createCollection(
      userId: Int!
      minifigId: Int!
      count: Int!
    ): Collection!

    authentication(email: String!, password: String!): AuthenticationResponse!
  }

  type AuthenticationResponse {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
