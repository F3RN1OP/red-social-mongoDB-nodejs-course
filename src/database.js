// ARCHIVO PARA LA CONEXION CON LA BASE DE DATOS

// requerir modulo de conexion a la base de datos
const mongoose = require('mongoose');

// extraer la uri para la conexion desde el archivos de cadenas (keys.js)
const { database } = require('./keys');

// metodo para conexion
mongoose.connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // prommis
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))