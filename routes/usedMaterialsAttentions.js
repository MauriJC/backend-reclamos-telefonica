const express = require('express');
const router = express.Router();
const usedMaterialsAttentionController = require('../controllers/usedMaterialsAttentionsController');

router.get('/:claimAttentionId', usedMaterialsAttentionController.getUsedMaterials);

// Ruta para agregar múltiples materiales usados a una atención específica
router.post('/', usedMaterialsAttentionController.addUsedMaterials);



module.exports = router;