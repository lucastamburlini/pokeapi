const { createPokemons, getPokemonById, getAllPokemons, searchPokemonByName } = require("../controllers/pokemonControllers");

const getAllPokemonsHandler = async (req, res) => {
    try {
        const { name } = req.query;

        const results = name
            ? await searchPokemonByName(name)
            : await getAllPokemons();
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getByIdPokemonsHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "BDD" : "API";

    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createPokemonHandler = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body
        const newPokemon = await createPokemons(name, image, hp, attack, defense, speed, height, weight, types);
        res.status(201).json(newPokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllPokemonsHandler,
    getByIdPokemonsHandler,
    createPokemonHandler
}