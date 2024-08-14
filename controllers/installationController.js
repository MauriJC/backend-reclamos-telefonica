const { Installation, Location, Service, Client, Used_materials_installation, Material, Service_type } = require('../src/model');
const sequelize = require('sequelize');

// Obtener todas las instalaciones
async function getAllInstallations(req, res) {
    try {
        const installations = await Installation.findAll();
        res.json(installations);
    } catch (error) {
        console.error('Error al obtener todas las instalaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Obtener todas las instalaciones Nuevas
async function getAllNewInstallations(req, res) {
    try {
        const installations = await Installation.findAll(
            {
                where: { status: 'Nuevo' },
                include: {
                    model: Service
                },
            });
        res.json(installations);
    } catch (error) {
        console.error('Error al obtener todas las instalaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


// Obtener una instalación por ID
async function getInstallationById(req, res) {
    const { id } = req.params;

    try {
        const installation = await Installation.findOne({
            where: { id_installation: id },
            include: [

                {
                    model: Service,
                    attributes: ['id_service', 'line_number', 'service_number'],
                    include: {
                        model: Client,
                        attributes: ['id_client', 'name', 'last_name', 'dni', 'contact_number']
                    },
                    include: {
                        model: Location,
                        attributes: ['id_location', 'textual_direction', 'latitude', 'longitude'],
                    },
                },
                {
                    model: Used_materials_installation,
                    attributes: ['id_used_materials_installation', 'used_quantity', 'price'],
                    include: {
                        model: Material,
                        attributes: ['id_material', 'name', 'description']
                    }
                }
            ]
        });

        if (!installation) {
            return res.status(404).json({ error: 'Installation not found' });
        }

        res.json(installation);
    } catch (error) {
        console.error('Error al obtener la instalación por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


async function getInstallationDetails(req, res) {
    const id_installation = req.params.id_installation;
    try {
        const installation = await Installation.findOne({
            where: { id_installation: id_installation },
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

        if (!installation) {
            return res.status(404).json({ error: 'Installation no encontrada' });
        }

        res.json(installation);
    } catch (error) {
        console.error('Error al obtener la información de la installation:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



// Crear una nueva instalación
async function createInstallation(req, res) {
    try {
        const installation = await Installation.create(req.body);
        res.status(201).json(installation);
    } catch (error) {
        console.error('Error al crear la instalación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Actualizar una instalación por ID
async function updateInstallation(req, res) {
    const { id } = req.params;
    try {
        const [updated] = await Installation.update(req.body, {
            where: { id_installation: id }
        });
        if (!updated) {
            return res.status(404).json({ error: 'Instalación no encontrada' });
        }
        res.json({ message: 'Instalación actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la instalación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Eliminar una instalación por ID
async function deleteInstallation(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Installation.destroy({
            where: { id_installation: id }
        });
        if (!deleted) {
            return res.status(404).json({ error: 'Instalación no encontrada' });
        }
        res.json({ message: 'Instalación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la instalación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Obtener instalaciones asignadas a un mobile
async function getInstallationsByMobile(req, res) {
    const { id } = req.params;
    try {
        const installations = await Installation.findAll({
            where: { id_mobile: id }
        });
        res.json(installations);
    } catch (error) {
        console.error('Error al obtener instalaciones por mobile:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Obtener instalaciones asignadas y no asignadas a un mobile en listas separadas
async function getInstallationsAssignedAndOthers(req, res) {
    const { id } = req.params;
    try {
        //console.log('HOLA')
        const assignedInstallations = await Installation.findAll({
            where: { id_mobile: id }
        });
        const otherInstallations = await Installation.findAll({
            where: {
                id_mobile: {
                    [sequelize.Op.ne]: id
                }
            }
        });
        res.json({
            assigned: assignedInstallations,
            other: otherInstallations
        });
    } catch (error) {
        console.error('Error al obtener instalaciones asignadas y no asignadas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function closeInstallation(req, res) {
    const {
        news,
        id_installation,
        id_service,
        id_mobile,
        photos,
        usedMaterialsData,
        latitude,
        longitude
    } = req.body;

    try {
        // Actualizar el estado del Claim a 'Finalizado'
        const install = await Installation.update(
            {
                status: 'Realizado',
                picture1: photos[0].base64,
                picture2: photos[1].base64,
                picture3: photos[2].base64,
                news: news

            },
            { where: { id_installation } }
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

        for (const material of usedMaterialsData) {
            await Used_materials_installation.create({
                id_installation: install.id_installation,
                id_material: material.id_material,
                used_quantity: material.quantity,
                price: material.price
            });
        }

        res.status(200).json({ message: 'Claim closed successfully' });
    } catch (error) {
        console.error('Error closing claim:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};







module.exports = {
    getAllInstallations,
    getInstallationById,
    createInstallation,
    updateInstallation,
    deleteInstallation,
    getInstallationsByMobile,
    getInstallationsAssignedAndOthers,
    getInstallationDetails,
    getAllNewInstallations,
    closeInstallation
};
