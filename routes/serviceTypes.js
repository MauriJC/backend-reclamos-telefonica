const express = require('express');
const router = express.Router();
const serviceTypesController = require('../controllers/serviceTypesController');

router.get('/', serviceTypesController.getAllServiceTypes);

module.exports = router;