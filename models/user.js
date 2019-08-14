'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicCollection: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    publicProfile: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Collection)
  };
  return User;
};