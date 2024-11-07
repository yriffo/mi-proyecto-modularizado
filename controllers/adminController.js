// controllers/adminController.js
const db = require('../config/database');

// Crear un curso
exports.createCourse = (req, res) => {
    const { nombre, docente_id } = req.body;

    const sql = 'INSERT INTO cursos (nombre, docente_id) VALUES (?, ?)';
    db.query(sql, [nombre, docente_id], (err, result) => {
        if (err) {
            res.status(500).send('Error al crear el curso');
        } else {
            res.send('Curso creado correctamente');
        }
    });
};

// Eliminar un curso
exports.deleteCourse = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM cursos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar el curso');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Curso no encontrado');
        } else {
            res.send('Curso eliminado correctamente');
        }
    });
};

// Registrar un estudiante
exports.createStudent = (req, res) => {
    const { nombre, curso_id } = req.body;

    const sql = 'INSERT INTO estudiantes (nombre, curso_id) VALUES (?, ?)';
    db.query(sql, [nombre, curso_id], (err, result) => {
        if (err) {
            res.status(500).send('Error al registrar el estudiante');
        } else {
            res.send('Estudiante registrado correctamente');
        }
    });
};

// Eliminar un estudiante
exports.deleteStudent = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM estudiantes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar el estudiante');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.send('Estudiante eliminado correctamente');
        }
    });
};

// Obtener todos los cursos
exports.getCourses = (req, res) => {
    const sql = 'SELECT * FROM cursos';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los cursos');
        } else {
            res.json(results);
        }
    });
};

// Obtener todos los estudiantes
exports.getStudents = (req, res) => {
    const sql = 'SELECT * FROM estudiantes';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los estudiantes');
        } else {
            res.json(results);
        }
    });
};
