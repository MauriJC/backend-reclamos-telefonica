const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role, Employee } = require('../src/model');

const JWT_SECRET = 'your_jwt_secret';

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    console.log(username, password, role);

    try {
        // Verificar si el rol existe
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

        res.status(201).json({ message: 'Usuario registrado con éxito', user: newUser }); //delete the returned user?
    } catch (error) {
        res.status(500).json({ message: 'Error registrando usuario', error });
        //console.log(error)
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, include: [{ model: Role }, { model: Employee }] });
    if (!user) return res.status(400).send('Usuario o contraseña incorrectos');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Usuario o contraseña incorrectos');

    const token = jwt.sign({ id_user: user.id_user, name: user.Employee.name, last_name: user.Employee.last_name, role: user.Role.name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
