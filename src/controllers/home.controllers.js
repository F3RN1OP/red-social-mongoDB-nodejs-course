// ARCHIVO CON CONTRALADORES DE PROPOSITO GENERAL

// controlador con funciones
const ctrl = {};

const { Image } = require('../models/index.models');

const sidebar = require('../helpers/sidebar');

// funcion para rederizar pagina principal
ctrl.index = async (req, res) => {
    // consulta '-1' de mayor a menor 
    const images = await Image.find().sort({ timeStamp: -1 });

    let viewModel = {images: []};
    viewModel.images = images;

    viewModel = await sidebar(viewModel);
    // se pasa los datos de la consulta
    res.render('index', viewModel);
};

module.exports = ctrl;