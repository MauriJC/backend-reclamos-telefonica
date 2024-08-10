const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Role } = require('../../src/model'); // Ajusta la ruta según sea necesario

const JWT_SECRET = 'your_jwt_secret'; // Cambia esto a una clave secreta más segura

// Middleware para verificar el token JWT y extraer la información del usuario
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);

    // Buscar el usuario en la base de datos y adjuntarlo a la request
    const foundUser = await User.findByPk(user.id_user, {
      include: Role
    });
    if (!foundUser) return res.sendStatus(404);

    req.user = foundUser;
    next();
  });
};

module.exports = authenticateToken