const bcrypt = require('bcryptjs')

const resolvers = {
  Query: {
    async user (root, { id }, { models }) {
      return models.User.findByPk(id)
    },
    async collection (root, { id }, { models }) {
      return models.Collection.find({userId: id})
    }
  },
  Mutation: {
    async createUser (root, { name, email, password }, { models }) {
      return models.User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        publicCollection: false,
        publicProfile: false
      })
    },
    async createCollection (root, { userId, minifigId, count, direction }, { models }) {
      return models.Collection.create({
        userId,
        minifigId,
        count
      })
    }
},
}

module.exports = resolvers