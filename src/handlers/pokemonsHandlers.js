const { createPokemons, getPokemonById } = require("../controllers/pokemonControllers");

const getAllPokemonsHandler = (req, res) => {
    const { name } = req.query;
    if (name !== undefined) res.send(`NIY: ESTA RUTA TRAE NAME:${name}`)
    else res.send("NIY: ESTA RUTA TRAE A TODOS LOS POKE")
}

const getByIdPokemonsHandler  = async (req, res) => {
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
        const { name, image, hp, attack, defense, speed, height, weight } = req.body
        const newPokemon = await createPokemons(name, image, hp, attack, defense, speed, height, weight);
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