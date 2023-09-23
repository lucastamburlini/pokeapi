require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const PokemonModel = require("./models/Pokemon");
const TypeModel = require("./models/Type");

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {
      logging: false,
      native: false
   }
);

// Models
PokemonModel(sequelize);
TypeModel(sequelize);

const { Pokemon, Type } = sequelize.models;

// Relaciones
Pokemon.belongsToMany(Type, { through: "typePokemon" });
Type.belongsToMany(Pokemon, { through: "typePokemon" })

module.exports = {
   ...sequelize.models,
   conn: sequelize,
};
