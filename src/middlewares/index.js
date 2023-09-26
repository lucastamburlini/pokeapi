const validateAll = (req, res, next) => {
    const { name } = req.query;
    if (name === undefined) {
        next();
    } else if (!name) {
        return res.status(400).json({ error: "Falta ingresar el nombre del Pokemon." });
    } else {
        next();
    }
}

const validateId = (req, res, next) => {
    const { id } = req.params;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (!id || (!uuidRegex.test(id) && isNaN(id))) {
        return res.status(400).json({ error: "ID de Pokemon no válido." });
    }
    next();
}

const validateCreate = (req, res, next) => {
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body
    if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types
    ) return res.status(400).json({ error: "Falta ingresar datos." });
    next();
}

module.exports = {
    validateAll,
    validateId,
    validateCreate
}