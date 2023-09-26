const { Router } = require("express");
const { getAllPokemonsHandler, getByIdPokemonsHandler, createPokemonHandler } = require("../handlers/pokemonsHandlers");
const pokemonsRouter = Router()
const { validateAll,
    validateId,
    validateCreate } = require("../middlewares/index.js")

pokemonsRouter.get("/", validateAll, getAllPokemonsHandler);

pokemonsRouter.get("/:id", validateId, getByIdPokemonsHandler);

pokemonsRouter.post("/pokemons", validateCreate, createPokemonHandler);

module.exports = pokemonsRouter;