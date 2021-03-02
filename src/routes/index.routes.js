// ARCHIVO DE ENRUTAMIENTO PRINCIPAL

// Requerir modulo Router de express
const { Router } = require('express');
// Ejecutar modulo Router 
const router = Router();

// controladores principales
const home = require('../controllers/home.controllers');

// controladores de imagenes
const image = require('../controllers/image.controllers');

// exporta una funcion que recibe como parametro el objeto app de express
module.exports = app => {

    // render index
    router.get('/', home.index);

    // accede a una imagen
    router.get('/images/:image_id', image.index);
    // sube una imagen
    router.post('/images', image.create);
    // like
    router.post('/images/:image_id/like', image.like);
    // comment
    router.post('/images/:image_id/comment', image.comment);
    // delete
    router.delete('/images/:image_id', image.remove);

    // utiliza el modulo de enrutado de express
    app.use(router);
};