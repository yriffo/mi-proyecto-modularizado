// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'tu_secreto_seguro';

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token viene como "Bearer <token>"
    if (!token) return res.status(401).send('Acceso denegado, no hay token');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Token inválido');
        req.user = user; // Guardamos los datos del usuario autenticado en la solicitud
        next();
    });
};