// app.js

// Importaciones necesarias
const express = require('express');
require('dotenv').config(); // Cargar variables de entorno

// Crear instancia de Express
const app = express();

// Middlewares básicos
app.use(express.json()); // Parsear JSON en las solicitudes

// Middleware opcional para habilitar CORS (si es necesario en tu proyecto)
const cors = require('cors');
app.use(cors()); // Permitir solicitudes desde diferentes orígenes

// Middleware opcional para log de solicitudes HTTP (útil para debug)
const morgan = require('morgan');
app.use(morgan('dev')); // Registra las solicitudes en la consola

// Conectar con la base de datos
require('./config/database'); // Cargar configuración de la base de datos

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');

// Middleware de manejo de errores
const errorHandler = require('./middlewares/errorHandler');

// Documentación de la API (Swagger)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// **Rutas principales**
app.use('/auth', authRoutes); // Rutas de autenticación
app.use('/admin', adminRoutes); // Rutas para administrador
app.use('/docente', docenteRoutes); // Rutas para docentes
app.use('/estudiante', estudianteRoutes); // Rutas para estudiantes

// Rutas para la documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Ruta para consultar la documentación de la API

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.status(200).send('¡Servidor funcionando correctamente!');
});

// Middleware global de manejo de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;
