// config/database.js
const mysql = require('mysql2');
require('dotenv').config(); // Cargar variables de entorno

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Detener la aplicación si falla la conexión
    }
    console.log('Conexión a la base de datos exitosa');
});

module.exports = db; // Exportamos la conexión para usarla en otros archivos
