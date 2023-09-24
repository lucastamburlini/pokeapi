const { Router } = require("express");
const pokemonsRouter = Router()

pokemonsRouter.get("/", (req, res) => {
    const { name } = req.query;
    if (name !== undefined) res.send(`NIY: ESTA RUTA TRAE NAME:${name}`)
    else res.send("NIY: ESTA RUTA TRAE A TODOS LOS POKE")
});

pokemonsRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    res.send(`NIY: ESTA RUTA TRAE INFO DE UN POKE CON ID ${id}`)
});

pokemonsRouter.post("/pokemons", (req, res) => {
    const { id, name, image, hp, attack, defense, speed, height, weight } = req.body

    res.send("NIY: ESTA RUTA CREA UN POKEMON")
});

module.exports = pokemonsRouter;