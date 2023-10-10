require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;
const PokemonModel = require("./models/Pokemon");
const TypeModel = require("./models/Type");
const pg = require('pg');

/* const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {
      logging: false,
      native: false
   }
); */

const sequelize = new Sequelize(
   DB_DEPLOY,
   {
      logging: false,
      native: false,
      dialectModule: pg
   }
);

// Models
PokemonModel(sequelize);
TypeModel(sequelize);

const { Pokemon, Type } = sequelize.models;

// Relaciones
Pokemon.belongsToMany(Type, { through: "typePokemon", as: 'types' });
Type.belongsToMany(Pokemon, { through: "typePokemon" })

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
