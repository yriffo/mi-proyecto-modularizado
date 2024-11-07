// controllers/docenteController.js
const db = require('../config/database');

// Obtener cursos del docente
exports.getMisCursos = (req, res) => {
    const docente_id = req.user.docente_id;

    const sql = 'SELECT * FROM cursos WHERE docente_id = ?';
    db.query(sql, [docente_id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los cursos');
        } else {
            res.json(results);
        }
    });
};

// Obtener estudiantes de un curso del docente
exports.getEstudiantesCurso = (req, res) => {
    const { curso_id } = req.params;
    const docente_id = req.user.docente_id;

    const sql = `
        SELECT estudiantes.id, estudiantes.nombre
        FROM estudiantes
        INNER JOIN cursos ON estudiantes.curso_id = cursos.id
        WHERE cursos.id = ? AND cursos.docente_id = ?`;

    db.query(sql, [curso_id, docente_id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los estudiantes del curso');
        } else {
            res.json(results);
        }
    });
};

// Registrar asistencias
exports.registrarAsistencias = (req, res) => {
    const { curso_id } = req.params;
    const { fecha, ausentes } = req.body;
    const docente_id = req.user.docente_id;

    const verificarCursoSql = 'SELECT * FROM cursos WHERE id = ? AND docente_id = ?';
    db.query(verificarCursoSql, [curso_id, docente_id], (err, results) => {
        if (err) {
            res.status(500).send('Error al verificar el curso');
        } else if (results.length === 0) {
            res.status(403).send('No tienes acceso a este curso');
        } else {
            const insertAsistenciasSql = `
                INSERT INTO asistencias (estudiante_id, fecha, presente) 
                VALUES ?`;

            const valores = ausentes.map((id) => [id, fecha, 0]);
            db.query(insertAsistenciasSql, [valores], (err, result) => {
                if (err) {
                    res.status(500).send('Error al registrar las asistencias');
                } else {
                    res.send('Asistencias registradas correctamente');
                }
            });
        }
    });
};
