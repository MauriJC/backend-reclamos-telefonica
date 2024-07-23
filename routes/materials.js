const express = require('express');
const router = express.Router();
const materialsController = require('../controllers/materialsController');

router.get('/', materialsController.getAllMaterials);

module.exports = router;