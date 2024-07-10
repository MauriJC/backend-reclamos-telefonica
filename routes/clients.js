const express = require('express');
const router = express.Router();
const { getAllClients, getClientById, createClient, updateClient, deleteClient, getClaimsByClientDNI, getClientByDni } = require('../controllers/clientController');

// Rutas relacionadas con los clientes
router.get('/:dni/claims', getClaimsByClientDNI); // Ruta para obtener reclamos de un cliente por ID
router.get('/', getAllClients);           // Obtener todos los clientes
router.get('/:id', getClientById);        // Obtener cliente por ID
router.post('/', createClient);           // Crear un nuevo cliente
router.put('/:id', updateClient);         // Actualizar cliente por ID
router.delete('/:id', deleteClient);      // Eliminar cliente por ID
router.get('/dni/:dni', getClientByDni); // Obtener cliente por dni

module.exports = router;


module.exports = router;
