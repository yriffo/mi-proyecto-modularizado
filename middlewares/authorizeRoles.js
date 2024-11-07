// middlewares/authorizeRoles.js
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).send('Acceso denegado. No tienes el rol adecuado.');
        }
        next();
    };
};

module.exports = authorizeRoles;
