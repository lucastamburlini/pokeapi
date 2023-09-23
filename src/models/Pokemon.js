const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pokemon', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
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
      type: DataTypes.STRING,
      allowNull: false,
    },

    attack: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    defense: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    speed: {
      type: DataTypes.STRING,
    },

    height: {
      type: DataTypes.INTEGER,
    },

    weight: {
      type: DataTypes.INTEGER,
    },

  }, { timestamps: false });
};
