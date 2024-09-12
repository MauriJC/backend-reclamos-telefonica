const express = require('express');
const { getClaimsByMobile, assignMobile, getAllMobiles, assignClaimsInstallations } = require('../controllers/mobileController');

const router = express.Router();

// Ruta para obtener los claims por id_mobile
router.get('/:id_mobile/claims', getClaimsByMobile);
router.post('/', assignMobile);
router.post('/assign', assignClaimsInstallations);
router.get('/', getAllMobiles);

module.exports = router;
