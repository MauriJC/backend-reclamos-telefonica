const { Claim,Mobile } = require('../src/model');

// Obtener todos los reclamos
exports.getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.findAll();
        res.json(claims);
    } catch (error) {
        //console.error(error);
        res.status(500).json({ message: 'Error al obtener los reclamos.' });
    }
};

// Obtener un reclamo por ID
exports.getClaimById = async (req, res) => {
    const { id } = req.params;
    try {
        const claim = await Claim.findByPk(id);
        if (!claim) {
            return res.status(404).json({ message: 'Reclamo no encontrado.' });
        }
        res.json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el reclamo.' });
    }
};




// Crear un nuevo reclamo
exports.createClaim = async (req, res) => {
    const { observations, status, id_service, id_close_without_visit } = req.body;
    try {
        const newClaim = await Claim.create({
            observations,
            status,
            id_service,
            id_close_without_visit
        });
        res.status(201).json(newClaim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el reclamo.' });
    }
};

// Actualizar un reclamo existente
exports.updateClaim = async (req, res) => {
    const { id } = req.params;
    const { observations, status, id_service, id_close_without_visit } = req.body;
    try {
        const claim = await Claim.findByPk(id);
        if (!claim) {
            return res.status(404).json({ message: 'Reclamo no encontrado.' });
        }
        await claim.update({
            observations,
            status,
            id_service,
            id_close_without_visit
        });
        res.json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el reclamo.' });
    }
};

// Eliminar un reclamo
exports.deleteClaim = async (req, res) => {
    const { id } = req.params;
    try {
        const claim = await Claim.findByPk(id);
        if (!claim) {
            return res.status(404).json({ message: 'Reclamo no encontrado.' });
        }
        await claim.destroy();
        res.json({ message: 'Reclamo eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el reclamo.' });
    }
};
