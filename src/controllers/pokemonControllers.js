const { Pokemon } = require("../db")
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
    const databasePokemon = await Pokemon.findOne({ where: { name: name } });
    const response = await axios.get(URL);
    const pokemonsApi = response.data;
    const pokemonData = pokemonsApi.results.find((pokemon) => pokemon.name === name);
    if (pokemonData) {
        const pokemonResponse = await axios.get(pokemonData.url);
        const fullPokemonData = pokemonResponse.data;
        return fullPokemonData
    }


}

const getPokemonById = async (id, source) => {
    const pokemon =
        source === "API"
            ? (await axios.get(`${URL}${id}`)).data
            : await Pokemon.findByPk(id);
    return pokemon;
}


const createPokemons = async (name, image, hp, attack, defense, speed, height, weight) =>
    await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });


module.exports = {
    createPokemons,
    getPokemonById,
    getAllPokemons,
    searchPokemonByName
}