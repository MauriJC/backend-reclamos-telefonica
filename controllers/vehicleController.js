const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const { Vehicle, Mobile } = require('../src/model');

async function createVehicle(req, res) {
    try {
        const { patent, description, availability } = req.body;
        const newVehicle = await Vehicle.create({ patent, description, availability });
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error creating vehicle', error });
    }
};

// Obtener todos los vehículos
async function getAllVehicles(req, res) {
    try {
        const vehicles = await Vehicle.findAll({ include: { model: Mobile } });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles', error });
    }
};

async function getAllAvailableVehicles(req, res) {
    try {
        const availableVehicles = await Vehicle.findAll({ where: { availability: 'Disponible', id_mobile: null } });
        res.status(200).json(availableVehicles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching vehicles', er })
    }
};

// Obtener un vehículo por ID
async function getVehicle(req, res) {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle', error });
    }
};

// Actualizar un vehículo por ID
async function updateVehicle(req, res) {
    try {
        const { patent, description, availability } = req.body;
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (vehicle) {
            await vehicle.update({ patent, description, availability });
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error });
    }
};

// Eliminar un vehículo por ID
async function deleteVehicle(req, res) {
    try {
        const vehicle = await Vehicle.findByPk(req.params.id);
        if (vehicle) {
            await vehicle.destroy();
            res.status(204).json({ message: 'Vehicle deleted' });
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle', error });
    }
};

module.exports = {
    createVehicle,
    getAllVehicles,
    updateVehicle,
    getVehicle,
    deleteVehicle,
    getAllAvailableVehicles
};
