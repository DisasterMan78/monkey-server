const bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      db = require('../models');

const resolvers = {
  Query: {
    async user(root, { id }, { models }, context) {
      if (typeof context.user === 'undefined') {
        throw new Error('Users must be logged in to view this data');
      }
      return models.User.findByPk(id);
    },
    async collection(root, { id }, { models }) {
      return models.Collection.findOne({ userId: id });
    },
  },
  Mutation: {
    async authentication(root, { email, password }, { models }) {
      const user = await models.User.findOne({
        type: db.Sequelize.QueryTypes.SELECT,
        where: {
          // eslint-disable-next-line object-shorthand
          email: email,
        },
      });

      if (!user) {
        throw new Error('Invalid Login');
      }

      const passwordMatch = await bcrypt.compare(password, user.dataValues.password);

      if (!passwordMatch) {
        throw new Error('Invalid Login');
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.email,
        },
        process.env.JWTSECRET,
        {
          expiresIn: '30d', // token will expire in 30days
        },
      );
      return {
        token,
        user,
      };
    },
    async createUser(root, { name, email, password }, { models }) {
      const foundUser = await models.User.findOne({
        where: {
          // eslint-disable-next-line object-shorthand
          email: email,
        },
      });

      if (foundUser) {
        throw new Error('Email is already registered');
      }
      return models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        publicCollection: false,
        publicProfile: false,
      });
    },
    async createCollection(root, {
      userId, minifigId, count,
    }, { models }) {
      return models.Collection.create({
        userId,
        minifigId,
        count,
      });
    },
  },
};

module.exports = resolvers;
