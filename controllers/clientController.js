const { Client, Claim, Service } = require('../src/model');

// Obtener todos los clientes
async function getAllClients(req, res) {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        console.error('Error al obtener todos los clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Obtener cliente por ID
async function getClientById(req, res) {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


// Obtener cliente por número de DNI
async function getClientByDni(req, res) {
    const { dni } = req.params;
    try {
        const client = await Client.findOne({
            where: {
                dni: dni
            }
        });
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error al obtener cliente por DNI:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


// Obtener reclamos por ID de cliente
async function getClaimsByClientDNI(req, res) {
    const { dni } = req.params;
    try {
        const client = await Client.findOne({
            where: {
                dni: dni
            },
            include: {
                model: Service,
                include: {
                    model: Claim
                }
            }
        });
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error al obtener los reclamos del cliente:', error);
        res.status(500).json({ error: 'Error al obtener los reclamos del cliente' });
    }
}

// Crear un nuevo cliente
async function createClient(req, res) {
    const { name, last_name, dni, contact_number } = req.body;
    try {
        const newClient = await Client.create({
            name,
            last_name,
            dni,
            contact_number,
        });
        res.status(201).json(newClient);
    } catch (error) {
        console.error('Error al crear un nuevo cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Actualizar cliente por ID
async function updateClient(req, res) {
    const { id } = req.params;
    const { name, last_name, dni, contact_number } = req.body;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await client.update({
            name,
            last_name,
            dni,
            contact_number,
        });
        res.json(client);
    } catch (error) {
        console.error('Error al actualizar cliente por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Eliminar cliente por ID
async function deleteClient(req, res) {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        await client.destroy();
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar cliente por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    getClaimsByClientDNI,
    getClientByDni
};
