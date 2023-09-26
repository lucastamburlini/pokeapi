const { getTypesPokemons } = require("../controllers/typesControllers");

const getTypePokemons = async (req, res) => {
    try {
        const typesPokemons = await getTypesPokemons();
        res.status(200).json(typesPokemons)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTypePokemons,
}