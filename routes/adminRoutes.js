// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');

// Rutas para cursos
router.post('/cursos', authenticateToken, authorizeRoles('admin'), adminController.createCourse); // Crear curso
router.delete('/cursos/:id', authenticateToken, authorizeRoles('admin'), adminController.deleteCourse); // Eliminar curso
router.get('/cursos', authenticateToken, authorizeRoles('admin'), adminController.getCourses); // Obtener todos los cursos

// Rutas para estudiantes
router.post('/estudiantes', authenticateToken, authorizeRoles('admin'), adminController.createStudent); // Crear estudiante
router.delete('/estudiantes/:id', authenticateToken, authorizeRoles('admin'), adminController.deleteStudent); // Eliminar estudiante
router.get('/estudiantes', authenticateToken, authorizeRoles('admin'), adminController.getStudents); // Obtener todos los estudiantes

module.exports = router;
