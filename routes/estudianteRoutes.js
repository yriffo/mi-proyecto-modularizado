// routes/estudianteRoutes.js
const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Rutas para estudiantes
router.get('/calificaciones', authenticateToken, authorizeRoles('estudiante'), estudianteController.getMisCalificaciones);
router.get('/asistencia', authenticateToken, authorizeRoles('estudiante'), estudianteController.getMiAsistencia);

module.exports = router;
