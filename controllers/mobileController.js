const { Claim, Mobile } = require('../src/model');

async function getClaimsByMobile(req, res) {
    const { id_mobile } = req.params;

    try {
        // Obtener los claims asignados al mobile específico
        const assignedClaims = await Claim.findAll({
            where: {
                id_mobile: id_mobile
            }
        });

        // Obtener los claims no asignados al mobile específico
        const unassignedClaims = await Claim.findAll({
            where: {
                id_mobile: null,
            },
        });

        res.json({
            assignedClaims,
            unassignedClaims,
        });
    } catch (error) {
        console.error('Error al obtener los reclamos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getClaimsByMobile,
};
