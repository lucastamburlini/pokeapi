const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pokemon', {

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    speed: {
      type: DataTypes.INTEGER,
    },

    height: {
      type: DataTypes.INTEGER,
    },

    weight: {
      type: DataTypes.INTEGER,
    },

    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  }, { timestamps: false,  underscored: true, });
};
