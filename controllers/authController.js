const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Role, Employee } = require('../src/model'); // Ajusta la ruta según tu estructura de proyecto


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: { username }, include: [
                { model: Role, attributes: ['name'] },
                { model: Employee, attributes: ['name', 'last_name'] }
            ]
        });


        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(403).send('Credenciales invalidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Nombre de usuario o contraseña invalidos' });
        }

        const userData = { 
            id: user.id, 
            username: user.username, 
            role: user.Role.name,
            name: user.Employee.name,
            last_name: user.Employee.last_name
        };

        const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
