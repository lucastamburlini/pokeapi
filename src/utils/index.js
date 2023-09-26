const clearPokemon = (data) => {
    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((e) => ({ name: e.type.name })),
    }
}

module.exports = {
    clearPokemon
}