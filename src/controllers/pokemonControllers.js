const { Pokemon } = require("../db")

const createPokemons = async (name, image, hp, attack, defense, speed, height, weight) =>
    await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight });


module.exports = {
    createPokemons
}