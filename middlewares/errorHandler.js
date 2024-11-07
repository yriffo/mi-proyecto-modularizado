// middlewares/errorHandler.js

// Middleware para manejar errores
module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log del error para debug
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Error interno del servidor',
    });
};
