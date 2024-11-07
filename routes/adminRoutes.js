// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Rutas para cursos
router.post('/cursos', authenticateToken, authorizeRoles('admin'), adminController.createCurso);
router.delete('/cursos/:id', authenticateToken, authorizeRoles('admin'), adminController.deleteCurso);
router.get('/cursos', authenticateToken, authorizeRoles('admin'), adminController.getCursos);

// Rutas para estudiantes
router.post('/estudiantes', authenticateToken, authorizeRoles('admin'), adminController.createEstudiante);
router.delete('/estudiantes/:id', authenticateToken, authorizeRoles('admin'), adminController.deleteEstudiante);
router.get('/estudiantes', authenticateToken, authorizeRoles('admin'), adminController.getEstudiantes);

module.exports = router;
