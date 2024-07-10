const express = require('express');
const router = express.Router();
const {
    getAllInstallations,
    getInstallationById,
    createInstallation,
    updateInstallation,
    deleteInstallation,
    getInstallationsByMobile,
    getInstallationsAssignedAndOthers
} = require('../controllers/installationController');

router.get('/', getAllInstallations);
router.get('/:id', getInstallationById);
router.post('/', createInstallation);
router.put('/:id', updateInstallation);
router.delete('/:id', deleteInstallation);
router.get('/mobile/:id', getInstallationsByMobile);
router.get('/mobile/:id/assigned-others', getInstallationsAssignedAndOthers);

module.exports = router;
