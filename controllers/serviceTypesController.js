const { Service_type } = require('../src/model');

exports.getAllServiceTypes = async (req, res) => {
    try {
        const claims = await Service_type.findAll();
        res.json(claims);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos de servicio.' });
    }
}