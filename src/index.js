const { ApolloServer } = require('apollo-server'),
      jwt = require('jsonwebtoken'),
      typeDefs = require('./schema'),
      resolvers = require('./resolvers'),
      models = require('../models');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const getUser = (token) => {
        if (token.length === 0) {
          throw new Error('No token received');
        }

        jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
          if (typeof error !== 'undefined') {
            throw new Error(error);
          }

          return decoded.username;
        });
      },
      server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
          const token = req.headers.authorization || '';

          let user;

          if (typeof token !== 'undefined' && token.length > 0) {
            user = getUser(token);
          }

          return { models, user };
        },
      });

server
  .listen()
  .then(({ url }) => console.log(`Server is running on ${url}`));
