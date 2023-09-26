const { Op } = require("sequelize");
const { Pokemon, Type} = require("../db");
const axios = require("axios");

const URL = "https://pokeapi.co/api/v2/pokemon/";

const getAllPokemons = async () => {
    const databasePokemon = await Pokemon.findAll();
    const allPokemons = (
        await axios.get(URL)
    ).data;
    return [{ ...allPokemons, ...databasePokemon }]
}

const searchPokemonByName = async (name) => {
    const databasePokemon = getAllPokemons();
    const databasePokemonFiltered = (await databasePokemon).filter(pokemon => pokemon.name === name)

    const response = await axios.get(`${URL}${name}`);
    const pokemonData = response.data;
    return { ...databasePokemonFiltered, ...databasePokemon }
}

const getPokemonById = async (id, source) => {
    const pokemon =
        source === "API"
            ? (await axios.get(`${URL}${id}`)).data
            : await Pokemon.findByPk(id);
    return pokemon;
}


const createPokemons = async (
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    types
) => {
    const newPokemon = await Pokemon.create({
        name,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        types,
    });
    const typeDb = await Type
}



module.exports = {
    createPokemons,
    getPokemonById,
    getAllPokemons,
    searchPokemonByName
}