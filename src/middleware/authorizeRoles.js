const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.Role.name)) {
      console.log('Rol no autorizado');
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = authorizeRole;
