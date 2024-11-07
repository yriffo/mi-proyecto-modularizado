// controllers/adminController.js
const db = require('../config/database');

// Crear un curso
exports.createCurso = (req, res) => {
    const { nombre, descripcion, docente_id } = req.body;

    const sql = 'INSERT INTO cursos (nombre, descripcion, docente_id) VALUES (?, ?, ?)';
    db.query(sql, [nombre, descripcion, docente_id], (err, result) => {
        if (err) {
            res.status(500).send('Error al crear el curso');
        } else {
            res.send('Curso creado correctamente');
        }
    });
};

// Eliminar un curso
exports.deleteCurso = (req, res) => {
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

// Obtener todos los cursos
exports.getCursos = (req, res) => {
    const sql = 'SELECT * FROM cursos';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los cursos');
        } else {
            res.json(results);
        }
    });
};

// Crear un estudiante
exports.createEstudiante = (req, res) => {
    const { nombre, curso_id } = req.body;

    const sql = 'INSERT INTO estudiantes (nombre, curso_id) VALUES (?, ?)';
    db.query(sql, [nombre, curso_id], (err, result) => {
        if (err) {
            res.status(500).send('Error al crear el estudiante');
        } else {
            res.send('Estudiante creado correctamente');
        }
    });
};

// Eliminar un estudiante
exports.deleteEstudiante = (req, res) => {
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

// Obtener todos los estudiantes
exports.getEstudiantes = (req, res) => {
    const sql = 'SELECT * FROM estudiantes';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los estudiantes');
        } else {
            res.json(results);
        }
    });
};
