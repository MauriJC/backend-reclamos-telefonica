const express = require('express');
const { getClaimsByMobile } = require('../controllers/mobileController');

const router = express.Router();

// Ruta para obtener los claims por id_mobile
router.get('/:id_mobile/claims', getClaimsByMobile);

module.exports = router;
