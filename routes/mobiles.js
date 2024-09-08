const express = require('express');
const { getClaimsByMobile, assignMobile } = require('../controllers/mobileController');

const router = express.Router();

// Ruta para obtener los claims por id_mobile
router.get('/:id_mobile/claims', getClaimsByMobile);
router.post('/', assignMobile);

module.exports = router;
