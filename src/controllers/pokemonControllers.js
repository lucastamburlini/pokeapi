const { Pokemon } = require("../db")
const axios = require("axios")

const URL = "https://pokeapi.co/api/v2/pokemon/";

/* 
const getAllPokemons = async (req, res) => {
    
}

*/
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
    getPokemonById
}