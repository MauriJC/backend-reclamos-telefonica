const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.Role.name)) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = authorizeRole;
  