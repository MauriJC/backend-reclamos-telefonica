const express = require('express');
const router = express.Router();
const {
    getAllInstallations,
    getInstallationById,
    createInstallation,
    updateInstallation,
    deleteInstallation,
    getInstallationsByMobile,
    getInstallationsAssignedAndOthers,
    getInstallationDetails,
    getAllNewInstallations,
    closeInstallation,
    getAllUnassignedInstallations
} = require('../controllers/installationController');

router.get('/new', getAllNewInstallations);
router.post('/close', closeInstallation)
router.get('/', getAllInstallations);
router.get('/int:id', getInstallationById);
router.post('/', createInstallation);
router.put('/:id', updateInstallation);
router.delete('/:id', deleteInstallation);
router.get('/mobile/:id', getInstallationsByMobile);
router.get('/mobile/:id/assigned-others', getInstallationsAssignedAndOthers);
router.get('/details/:id_installation', getInstallationDetails);
router.get('/unassigned', getAllUnassignedInstallations)


module.exports = router;
