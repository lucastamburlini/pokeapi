const axios = require("axios")
const { Type } = require("../db")

const getTypesPokemons = async () => {

    try {
        // Verifico si hay tipos existentes.
        const existingTypes = await Type.findAll();
        if (existingTypes.length == 0) {
            // si la BD está vacía obtengo los tipos desde la api.
            const response = await axios.get("https://pokeapi.co/api/v2/type/")
            const { data } = response;
            // Luego, almaceno la información en la base de datos.
            const typesToSave = data.results.map((item) => ({
                name: item.name,
            }));
            await Type.bulkCreate(typesToSave);
            // Devuelve los tipos obtenidos de la API
            return typesToSave.map((type) => type.name);
        }
        // Si la base de datos ya tiene tipos, devolverlos
        return existingTypes.map((type) => type.name);
    } catch (error) {
        console.error("Error al obtener y guardar tipos de Pokémon:", error);
        throw error;
    }

}

module.exports = {
    getTypesPokemons
}