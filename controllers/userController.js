const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, Employee } = require('../src/model');
require('dotenv').config();

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.registerUser = async (req, res) => {
    const { username, password, role, name, last_name, dni } = req.body;

    try {
        const roleData = await Role.findOne({ where: { name: role } });
        if (!roleData) {
            return res.status(400).send('Rol no válido');
        }
        
        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el nuevo usuario
        const newUser = await User.create({
            username,
            password: hashedPassword,
            id_role: roleData.id_role
        });

        const newEmployee = await Employee.create({
            name, last_name, dni, id_user: newUser.id_user
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser, employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error registrando usuario', error });
        //console.log(error)
    }
};

exports.login = async (req, res) => {
    try {
        //console.log('login')
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username },
            include: [{ model: Role }, { model: Employee }]
        });
        if (!user) return res.status(400).send('Usuario o contraseña incorrectos');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Usuario o contraseña incorrectos');

        console.log(JWT_SECRET)

        const token = jwt.sign({
            id_user: user.id_user,
            name: user.Employee.name,
            last_name: user.Employee.last_name,
            role: user.Role.name
        },
            JWT_SECRET, { expiresIn: '1h' });
        console.log('el token enviado es', token);
        return res.status(200).json({ token });
    } catch (error) {
        return res.json(error);
    }

};
