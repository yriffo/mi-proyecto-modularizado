// controllers/estudianteController.js
const db = require('../config/database');

// Obtener calificaciones del estudiante
exports.getMisCalificaciones = (req, res) => {
    const estudiante_id = req.user.id;

    const sql = `
        SELECT cursos.nombre AS curso, calificaciones.actividad, calificaciones.nota, calificaciones.tipo
        FROM calificaciones
        INNER JOIN estudiantes ON calificaciones.estudiante_id = estudiantes.id
        INNER JOIN cursos ON estudiantes.curso_id = cursos.id
        WHERE estudiantes.id = ?`;

    db.query(sql, [estudiante_id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener las calificaciones');
        } else {
            res.json(results);
        }
    });
};

// Consultar asistencia
exports.getMiAsistencia = (req, res) => {
    const estudiante_id = req.user.id;

    const sql = `
        SELECT cursos.nombre AS curso, asistencias.fecha, asistencias.presente
        FROM asistencias
        INNER JOIN estudiantes ON asistencias.estudiante_id = estudiantes.id
        INNER JOIN cursos ON estudiantes.curso_id = cursos.id
        WHERE estudiantes.id = ?`;

    db.query(sql, [estudiante_id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la asistencia');
        } else {
            res.json(results);
        }
    });
};
