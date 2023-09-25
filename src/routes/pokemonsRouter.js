const { Router } = require("express");
const { getAllPokemonsHandler, getByIdPokemonsHandler, createPokemonHandler } = require("../handlers/pokemonsHandlers");
const pokemonsRouter = Router()

pokemonsRouter.get("/", getAllPokemonsHandler);

pokemonsRouter.get("/:id", getByIdPokemonsHandler);

pokemonsRouter.post("/pokemons", createPokemonHandler);

module.exports = pokemonsRouter;