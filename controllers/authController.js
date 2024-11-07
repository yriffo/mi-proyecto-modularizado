// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database'); // Importamos la conexión
const SECRET_KEY = process.env.SECRET_KEY || 'tu_secreto_seguro';

// Controlador para registrar usuarios
exports.register = async (req, res) => {
    const { username, password, docente_id, rol } = req.body;

    const checkDocenteSql = 'SELECT * FROM docentes WHERE id = ?';
    db.query(checkDocenteSql, [docente_id], async (err, results) => {
        if (err) {
            res.status(500).send('Error al verificar el docente');
        } else if (results.length === 0) {
            res.status(400).send('El docente especificado no existe');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertUserSql = 'INSERT INTO usuarios (username, password, docente_id, rol) VALUES (?, ?, ?, ?)';
            db.query(insertUserSql, [username, hashedPassword, docente_id, rol || 'docente'], (err, result) => {
                if (err) {
                    res.status(500).send('Error al registrar el usuario');
                } else {
                    res.send('Usuario registrado correctamente');
                }
            });
        }
    });
};

// Controlador para iniciar sesión
exports.login = (req, res) => {
    const { username, password } = req.body;

    const checkUserSql = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(checkUserSql, [username], async (err, results) => {
        if (err) {
            res.status(500).send('Error al verificar el usuario');
        } else if (results.length === 0) {
            res.status(400).send('Usuario no encontrado');
        } else {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                res.status(401).send('Contraseña incorrecta');
                return;
            }

            const token = jwt.sign(
                { id: user.id, docente_id: user.docente_id, rol: user.rol },
                SECRET_KEY,
                { expiresIn: '1h' }
            );
            res.json({ token });
        }
    });
};
