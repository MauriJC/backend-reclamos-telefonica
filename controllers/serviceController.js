const { Service, Client } = require('../src/model');


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.serviceId);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceByLineNumber = async (req, res) => {
    try {
        const service = await Service.findOne({ where: { line_number: req.params.lineNumber } });
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServicesByClientId = async (req, res) => {
    try {
        const services = await Service.findAll({ where: { id_client: req.params.clientId } });
        if (services.length > 0) {
            res.json(services);
        } else {
            res.status(404).json({ error: 'No services found for this client' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getServicesByClientDni = async(req, res) =>  {
    const { dni } = req.params;
    try {
        const client = await Client.findOne({
            where: { dni: dni },
            include: {
                model: Service,
                required: true // Para asegurarnos de que solo incluya clientes que tienen servicios
            }
        });

        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const services = client.Services; // Los servicios asociados al cliente

        res.json(services);
    } catch (error) {
        console.error('Error al obtener servicios por DNI del cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}



exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.serviceId);
        if (service) {
            await service.update(req.body);
            res.json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.serviceId);
        if (service) {
            await service.destroy();
            res.json({ message: 'Service deleted' });
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


