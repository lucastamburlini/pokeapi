const { Router } = require("express");
const pokemonsRouter = Router()

pokemonsRouter.get("/", (req, res) => {
    res.send("NIY: ESTA RUTA TRAE A TODOS LOS POKE")
});

pokemonsRouter.get("/:idPokemon", (req, res) => {
    res.send("NIY: ESTA RUTA TRAE INFO DE UN POKE")
});

module.exports = pokemonsRouter;