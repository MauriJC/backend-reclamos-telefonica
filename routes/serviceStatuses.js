const express = require('express');
const router = express.Router();
const serviceStatusController = require('../controllers/serviceStatusController');

router.get('/', serviceStatusController.getAllServiceStatuses);
router.post('/', serviceStatusController.createServiceStatus);
router.get('/:statusId', serviceStatusController.getServiceStatusById);
router.put('/:statusId', serviceStatusController.updateServiceStatus);
router.delete('/:statusId', serviceStatusController.deleteServiceStatus);

module.exports = router;