const { Router } = require('express');

// Importar todos los routers
const pokemonsRouter = require("./pokemonsRouter.js")
const typesRouter = require("./typesRouter.js")


const router = Router();

// Configurar los routers
router.use("/pokemons", pokemonsRouter)
router.use("/types", typesRouter)

module.exports = router;
