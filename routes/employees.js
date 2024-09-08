const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Crear un nuevo empleado
router.post('/', employeeController.createEmployee);

// Obtener todos los empleados
router.get('/', employeeController.getAllEmployees);

// Obtener todos los empleados tecnicos
router.get('/technicians/available', employeeController.getAllAvailableTechnicians);

// Obtener un empleado por ID
router.get('/:id', employeeController.getEmployeeById);

// Actualizar un empleado por ID
router.put('/:id', employeeController.updateEmployee);

// Eliminar un empleado por ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
