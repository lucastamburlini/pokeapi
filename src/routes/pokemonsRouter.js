const { Router } = require("express");
const { createPokemon, getByIdPokemons, getAllPokemons } = require("../handlers/pokemonsHandlers");
const pokemonsRouter = Router()

pokemonsRouter.get("/", getAllPokemons);

pokemonsRouter.get("/:id", getByIdPokemons);

pokemonsRouter.post("/pokemons", createPokemon);

module.exports = pokemonsRouter;