const { Service, Client, Location } = require('../src/model');


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
        const service = await Service.findOne({
            where: { line_number: req.params.lineNumber },
            include: [
                {
                    model: Client,
                },
                {
                    model: Location,
                }
            ]
        });
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


exports.getServicesByClientDni = async (req, res) => {
    const { dni } = req.params;
    try {
        const client = await Client.findOne({
            where: { dni },
            include: [{
                model: Service,
                include:[{model:Location}]
            }]
        });

        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(client);
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


