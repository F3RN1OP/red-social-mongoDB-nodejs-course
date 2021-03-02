// ARCHIVO DE INICIALIZACION DEL SERVIDOR

// requerir express framework de node
const express = require('express');

// requerir archivo de configuracion del servidor
const config = require('./server/config');

// DATABASE
// archivo de conexion para la base de datos
require('./database');

// ejecutar la funcion y pasarle por parametro el objeto que entrega express
const app = config(express());


// LISTENING THE SERVER
    // haciendo del puerto establecido (config.js)
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});
