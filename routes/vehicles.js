const express = require('express');
const router = express.Router();
const {
    createVehicle,
    getAllVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
    getAllAvailableVehicles
} = require('../controllers/vehicleController');

router.post('/',createVehicle);
router.get('/',getAllVehicles);
router.get('/available',getAllAvailableVehicles);
router.get('/:id',getVehicle);
router.put('/:id',updateVehicle);
router.delete('/:id',deleteVehicle);



module.exports = router;
