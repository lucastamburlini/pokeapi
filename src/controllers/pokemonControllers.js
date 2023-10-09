const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { clearPokemon } = require("../utils");

// const URL = "https://pokeapi.co/api/v2/pokemon/";
const URL = "https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0";

/* -------------------------------------------------------- */
// Funciones para traer a todos los pokemones
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
            as: 'types',
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });
}

const getAllPokemons = async () => {
    try {
        const pokemons_BDD = await getAllPokemonsBdd();
        const pokemons_API = await getAllPokemonsApi();
        return [...pokemons_BDD, ...pokemons_API];
    } catch (error) {
        console.error("Error al obtener todos los Pokémon:", error);
        throw error;
    }
}

/* -------------------------------------------------------- */
// Funciones para buscar por nombres los pokemones
/* -------------------------------------------------------- */

const getAllPokemonsBddByName = async (name) => {
    try {
        const pokemons = await Pokemon.findAll({
            where: {
                name: name
            },
            include: {
                model: Type,
                as: 'types',
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            }
        });
        return pokemons;
    } catch (error) {
        console.error("Error en la función getAllPokemonsBddByName:", error);
        throw error;
    }
}


const pokemonByNameApi = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { data } = response
    const pokemon = clearPokemon(data)
    return pokemon
}

const searchPokemonByName = async (name) => {
    try {
        const pokemons_BDD = await getAllPokemonsBddByName(name);
        if (pokemons_BDD.length > 0) {
            return pokemons_BDD;
        }
        const pokemons_API = await pokemonByNameApi(name);
        return [pokemons_API];
    } catch (error) {
        console.error("Error al buscar el Pokémon por nombre:", error);
        throw error;
    }
}

/* -------------------------------------------------------- */
// Funciones para buscar por ID 
/* -------------------------------------------------------- */

const getPokemonById = async (id, source) => {
    try {
        const pokemon =
            source === "API"
                ? await pokemonIdApi(id)
                : await Pokemon.findByPk(id, {
                    include: {
                        model: Type,
                        as: "types",
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    }
                });
        return pokemon;
    } catch (error) {
        console.error("Error al buscar el Pokémon por ID:", error);
        throw error;
    }
}

const pokemonIdApi = async (id) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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

    const existingPokemon = await Pokemon.findOne({
        where: { name: lowerCaseName }
    })


    if (existingPokemon) {
        throw new Error("El Pokémon con este nombre ya existe en la base de datos.");
    } else {
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
}

/* -------------------------------------------------------- */
// Función para borrar un pokemon
/* -------------------------------------------------------- */

const deletePokemon = async (id) => {
    try {
        await Pokemon.destroy({ where: { id } })
    } catch (error) {
        console.error(error)
    }
}


module.exports = {
    createPokemons,
    getPokemonById,
    getAllPokemons,
    searchPokemonByName,
    deletePokemon
}