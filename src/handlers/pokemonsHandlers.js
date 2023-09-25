const { createPokemons } = require("../controllers/pokemonControllers");

const getAllPokemons = (req, res) => {
    const { name } = req.query;
    if (name !== undefined) res.send(`NIY: ESTA RUTA TRAE NAME:${name}`)
    else res.send("NIY: ESTA RUTA TRAE A TODOS LOS POKE")
}

const getByIdPokemons = (req, res) => {
    const { id } = req.params;
    res.send(`NIY: ESTA RUTA TRAE INFO DE UN POKE CON ID ${id}`)
}

const createPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight } = req.body
        const newPokemon = await createPokemons(name, image, hp, attack, defense, speed, height, weight);
        res.status(201).json(newPokemon)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllPokemons,
    getByIdPokemons,
    createPokemon
}