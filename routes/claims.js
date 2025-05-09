const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');

// Rutas para los reclamos
router.get('/', claimController.getAllClaims);
router.get('/unassigned', claimController.getUnassignedClaims);
router.get('/:id', claimController.getClaimById);
router.get('/details/:id_claim', claimController.getClaimDetails);
router.post('/', claimController.createClaim);
router.put('/:id', claimController.updateClaim);
router.delete('/:id', claimController.deleteClaim);
router.post('/close', claimController.closeClaim);
router.post('/closewithoutvisit/:id_claim', claimController.closeClaimWithoutVisit);


module.exports = router;
