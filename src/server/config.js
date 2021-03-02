// ARCHIVO DE CONFIGURACION DEL SERVIDOR

// modulo para manejo de directorios
const path = require('path');
// motor de plantillas
const exphbs = require('express-handlebars');

// modulo para mostrar por consola todas las peticiones
const morgan = require('morgan');
// modulo para el manejo de archivos
const multer = require('multer');
// framework de node
const express = require('express');
// modulo para manejo de errores
const errorHandler = require('errorhandler');

// archivo enrutador
const routes = require('../routes/index.routes');

// exortar funcion que recibe un objeto (app)
module.exports = app => {
    // SETTINGS
    // estableciendo puerto
    app.set('port', process.env.PORT || 3000);
    // establecer el directorio de las vistas
    app.set('views', path.join(__dirname, '../views'));
    // configurando el motor de plantillas (handlebars)
    app.engine('.hbs', exphbs({
        // marco principal
        defaultLayout: 'main',
        // directorio de partes
        partialsDir: path.join(app.get('views'), 'partials'),
        // directorio de marcos
        layoutsDir: path.join(app.get('views'), 'layouts'),
        // extencion de archivos
        extname: '.hbs',
        // directorio de fragmentos de ayuda
        helpers: require('./helpers')
    }));
    // estableciendo el motor de plantillas (handlebars)
    app.set('view engine', '.hbs');

    // MIDDLEWARES
    // configuracion de morgan
    app.use(morgan('dev'));
    // configuracion de multer
    app.use(multer({
        // directorio de destino
        dest: path.join(__dirname, '../public/upload/temp')
        // solo aceptara 1 archivo a la vez y el nombre del input sera 'image'
    }).single('image'));
    // modulo de express para recibir datos desde formularios
    app.use(express.urlencoded({ extended: false }));
    // modulo de express para poder interpretar json
    app.use(express.json());

    // ROUTES
    // se le pasa la variable (app) a el archivo enrutador (index.routes.jss)
    routes(app);

    // STATICS FILES
    // establecer directorio de archivos de uso publico e inmutables
    app.use('/public', express.static(path.join(__dirname, '../public')));

    // ERRORHANDLERS
    // si el proyecto esta modo de desarrollo ejecuta el modulo errorHadler
    if ('development' === app.get('env')) {
        // modulo para menejo de errores
        app.use(errorHandler);
    };

    // retorna la configuracion
    return app;
}