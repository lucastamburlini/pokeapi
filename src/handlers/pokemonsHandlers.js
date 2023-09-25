const getAllPokemons = (req, res) => {
    const { name } = req.query;
    if (name !== undefined) res.send(`NIY: ESTA RUTA TRAE NAME:${name}`)
    else res.send("NIY: ESTA RUTA TRAE A TODOS LOS POKE")
}

const getByIdPokemons = (req, res) => {
    const { id } = req.params;
    res.send(`NIY: ESTA RUTA TRAE INFO DE UN POKE CON ID ${id}`)
}

const createPokemon = (req, res) => {
    const { id, name, image, hp, attack, defense, speed, height, weight } = req.body

    res.send(`NIY: ESTA RUTA CREA UN POKEMON CON LOS SIGUIENTES DATOS:
    id:${id}, name:${name}, image:${image}, hp:${hp}, attack:${attack}, defense:${defense}, speed:${speed}, height:${height}, weight:${weight}
    `)
}

module.exports = {
    getAllPokemons,
    getByIdPokemons,
    createPokemon
}