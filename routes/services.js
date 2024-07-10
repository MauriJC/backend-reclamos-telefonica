const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.get('/:serviceId', serviceController.getServiceById);
router.put('/:serviceId', serviceController.updateService);
router.delete('/:serviceId', serviceController.deleteService);
router.get('/client/:clientId', serviceController.getServicesByClientId);
router.get('/line_number/:lineNumber', serviceController.getServiceByLineNumber); 
router.get('/client/:dni', serviceController.getServicesByClientDni);

module.exports = router;