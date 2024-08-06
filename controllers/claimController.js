const { Claim, Client, Service, Location, Service_type, Claim_attention, Used_materials_attention } = require('../src/model');

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


exports.getClaimDetails = async (req, res) => {
    const claimId = req.params.id_claim;
    try {
        const claim = await Claim.findOne({
            where: { id_claim: claimId },
            include: [
                {
                    model: Service,
                    include: [
                        {
                            model: Client,
                        },
                        {
                            model: Location,
                        },
                        {
                            model: Service_type,
                        }
                    ]
                }
            ]
        });

        if (!claim) {
            return res.status(404).json({ error: 'Claim no encontrado' });
        }

        res.json(claim);
    } catch (error) {
        console.error('Error al obtener la información del claim:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




// Crear un nuevo reclamo
exports.createClaim = async (req, res) => {
    const { observations, id_service,visit_shedules_availability } = req.body;
    try {
        const newClaim = await Claim.create({
            observations,
            status:'Nuevo',
            id_service,
            visit_shedules_availability
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

exports.closeClaim = async (req, res) => {
    const {
        observations,
        id_claim,
        id_service,
        id_mobile,
        photos,
        usedMaterialsData,
        latitude,
        longitude
    } = req.body;

    try {


        // Actualizar el estado del Claim a 'Finalizado'
        await Claim.update(
            { status: 'Finalizado' },
            { where: { id_claim } }
        );
        // Verificar si el servicio tiene una Location asociada
        const service = await Service.findByPk(id_service, {
            include: [Location]
        });

        if (service.Location) {
            // Actualizar la Location existente
            await service.Location.update({
                latitude,
                longitude
            });
        }

        // Procesar el resto de la lógica para cerrar el claim
        const claimAttention = await Claim_attention.create({
            observations,
            id_claim,
            picture1: photos[0].base64,
            picture2: photos[1].base64,
            picture3: photos[2].base64,
        });

        for (const material of usedMaterialsData) {
            await Used_materials_attention.create({
                id_claim_attention: claimAttention.id_claim_attention,
                id_material: material.id_material,
                used_quantity: material.quantity
            });
        }

        res.status(200).json({ message: 'Claim closed successfully' });
    } catch (error) {
        console.error('Error closing claim:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};