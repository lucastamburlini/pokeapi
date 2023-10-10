require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Pool } = require('pg');
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const PokemonModel = require("./models/Pokemon");
const TypeModel = require("./models/Type");

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
   logging: false,
   native: false
 });

/* const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {
      logging: false,
      native: false
   }
);  */


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
