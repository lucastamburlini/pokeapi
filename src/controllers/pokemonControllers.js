const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { clearPokemon } = require("../utils");

const URL = "https://pokeapi.co/api/v2/pokemon/";

/* -------------------------------------------------------- */
// Funciones para buscar a todos los pokemones
/* -------------------------------------------------------- */

const getAllPokemonsApi = async () => {
    const response = await axios.get(URL);
    const { data } = response
    const pokemonPromises = data.results.map((pokemon) => axios(pokemon.url))
    const pokemonResponses = await Promise.all(pokemonPromises);
    const dataLimpia = pokemonResponses.map((response) => clearPokemon(response.data));

    return dataLimpia;
}

const getAllPokemonsBdd = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });
}

const getAllPokemons = async () => {
    const pokemons_BDD = await getAllPokemonsBdd();
    const pokemons_API = await getAllPokemonsApi();
    return [...pokemons_BDD, ...pokemons_API]
}

/* -------------------------------------------------------- */
// Funciones para buscar por nombres los pokemones
/* -------------------------------------------------------- */

const getAllPokemonsBddByName = async (name) => {
    return await Pokemon.findAll({
        where: {
            name: name
        },
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });
}

const pokemonByNameApi = async (name) => {
    const response = await axios.get(`${URL}${name}`);
    const { data } = response
    const pokemon = clearPokemon(data)
    return pokemon
}

const searchPokemonByName = async (name) => {
    const pokemons_BDD = await getAllPokemonsBddByName(name);
    const pokemons_API = await pokemonByNameApi(name);
    console.log(pokemons_API);

    return [{ ...pokemons_BDD, ...pokemons_API }]
}

/* -------------------------------------------------------- */
// Funciones para buscar por ID
/* -------------------------------------------------------- */

const getPokemonById = async (id, source) => {
    const pokemon =
        source === "API"
            ? await pokemonIdApi(id)
            : await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                }
            });
    return pokemon;
}

const pokemonIdApi = async (id) => {
    const response = await axios.get(`${URL}${id}`);
    const { data } = response
    const pokemon = clearPokemon(data)
    return pokemon
}

/* -------------------------------------------------------- */
// Funciones para crear un pokemon
/* -------------------------------------------------------- */


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
    const lowerCaseName = name.toLowerCase();
    const newPokemon = await Pokemon.create({
        name: lowerCaseName,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types
    });
    const typeDb = await Type.findAll(
        {
            where: {
                name: types
            }
        }
    )
    newPokemon.addTypes(typeDb);
    tipo = typeDb.map((item) => item.name);
    return { ...newPokemon.dataValues, types: tipo };
}



module.exports = {
    createPokemons,
    getPokemonById,
    getAllPokemons,
    searchPokemonByName
}