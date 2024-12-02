const { Service, Client, Location, Service_type, Service_status, Installation } = require('../src/model');


exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createService = async (req, res) => {
    const { id_client, textual_direction, date, service_type, line_number, service_number } = req.body;
    try {
        const client = await Client.findByPk(id_client);
        console.log(id_client)
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        const location = await Location.create({
            textual_direction,
        });

        const service_status = await Service_status.findOne({ where: { description: 'Esperando instalacion' } });

        const service = await Service.create({
            id_client,
            line_number,
            id_location: location.id_location,
            createdAt: date,
            id_service_type: service_type,
            service_number,
            id_service_status: service_status.id_service_status,
        });

        await location.update({
            id_service: service.id_service
        });

        await Installation.create({
            id_service: service.id_service,
            status: 'Nuevo',
        });

        res.status(201).json(service);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.serviceId, { include: { model: Location } });
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
                include: [{ model: Location }]
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
            await service.update(req.body, { silent: true });
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


