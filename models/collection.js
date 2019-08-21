
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minifigId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Collection.associate = (models) => {
    Collection.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Collection;
};
