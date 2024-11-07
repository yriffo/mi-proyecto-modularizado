// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi'); // Importar Joi para validaciones
const db = require('../config/database'); // Importamos la conexión
const SECRET_KEY = process.env.SECRET_KEY || 'tu_secreto_seguro';

// Validación con Joi para el registro de usuarios
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    docente_id: Joi.number().required(),
    rol: Joi.string().valid('admin', 'docente').optional(),
});

// Validación con Joi para el inicio de sesión
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

// Controlador para registrar usuarios
exports.register = async (req, res) => {
    // Validar los datos enviados
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password, docente_id, rol } = req.body;

    // Verificar si el docente existe
    const checkDocenteSql = 'SELECT * FROM docentes WHERE id = ?';
    db.query(checkDocenteSql, [docente_id], async (err, results) => {
        if (err) {
            return res.status(500).send('Error al verificar el docente');
        }
        if (results.length === 0) {
            return res.status(400).send('El docente especificado no existe');
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario en la base de datos
        const insertUserSql = 'INSERT INTO usuarios (username, password, docente_id, rol) VALUES (?, ?, ?, ?)';
        db.query(insertUserSql, [username, hashedPassword, docente_id, rol || 'docente'], (err) => {
            if (err) {
                return res.status(500).send('Error al registrar el usuario');
            }
            res.send('Usuario registrado correctamente');
        });
    });
};

// Controlador para iniciar sesión
exports.login = (req, res) => {
    // Validar los datos enviados
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;

    // Verificar si el usuario existe
    const checkUserSql = 'SELECT * FROM usuarios WHERE username = ?';
    db.query(checkUserSql, [username], async (err, results) => {
        if (err) {
            return res.status(500).send('Error al verificar el usuario');
        }
        if (results.length === 0) {
            return res.status(400).send('Usuario no encontrado');
        }

        const user = results[0];

        // Comparar las contraseñas
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, docente_id: user.docente_id, rol: user.rol },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    });
};
