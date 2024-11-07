// routes/docenteRoutes.js
const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docenteController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Rutas para docentes
router.get('/cursos', authenticateToken, authorizeRoles('docente'), docenteController.getMisCursos);
router.get('/cursos/:curso_id/estudiantes', authenticateToken, authorizeRoles('docente'), docenteController.getEstudiantesCurso);
router.post('/cursos/:curso_id/asistencias', authenticateToken, authorizeRoles('docente'), docenteController.registrarAsistencias);

module.exports = router;
