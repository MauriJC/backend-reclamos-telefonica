const { Service_status } = require('../src/model');

exports.getAllServiceStatuses = async (req, res) => {
    try {
        const statuses = await Service_status.findAll();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createServiceStatus = async (req, res) => {
    try {
        const status = await Service_status.create(req.body);
        res.status(201).json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceStatusById = async (req, res) => {
    try {
        const status = await Service_status.findByPk(req.params.statusId);
        if (status) {
            res.json(status);
        } else {
            res.status(404).json({ error: 'Service status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateServiceStatus = async (req, res) => {
    try {
        const status = await Service_status.findByPk(req.params.statusId);
        if (status) {
            await status.update(req.body);
            res.json(status);
        } else {
            res.status(404).json({ error: 'Service status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteServiceStatus = async (req, res) => {
    try {
        const status = await Service_status.findByPk(req.params.statusId);
        if (status) {
            await status.destroy();
            res.json({ message: 'Service status deleted' });
        } else {
            res.status(404).json({ error: 'Service status not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};