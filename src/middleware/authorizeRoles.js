const authorizeRoles = (requiredRoles) => {
    return (req, res, next) => {
      const { role } = req.user;
      if (!requiredRoles.includes(role)) {
        return res.status(403).send('Access denied');
      }
      next();
    };
  };
  
  module.exports = authorizeRoles;
  