// ARCHIVO CON CONTROLADORES PARA MANEJO DE IMAGENES

// modulo path
const path = require('path');
// helpers
const { randomNumber } = require('../helpers/libs')
// modulo file sistem 
const fs = require('fs-extra');
// modulo que convierte emails en hash
const md5 = require('md5')

// modelos de datos
const { Image, Comment } = require('../models/index.models');
// eliminar archivos
const { unlink } = require('fs');

const sidebar = require('../helpers/sidebar');

// controlador con funciones
const ctrl = {};

// funcion para renderizar una imagenen
ctrl.index = async (req, res) => {
    // diseño de modelo
    let viewModel = { image: {}, comments: {} };

    // consulta con validacion atravez de una expresion regular {$regex}
    const image = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    if (image) {
        // incrementar contador de vistas
        image.views = image.views + 1;
        // una vez actualizada se guarda en el objeto
        viewModel.image = image;
        await image.save();
        // consuta todos los comentarios relacionados con la imagen
        const comments = await Comment.find({ image_id: image._id }).sort({ timeStamp: -1 });;
        // una vez encontrados se guardan en el objeto
        viewModel.comments = comments;
        // renderiza la vista con la imagen, y sus comentarios que fueron guardados en el objeto viewModel

        viewModel = await sidebar(viewModel);

        res.render('image', viewModel);
    } else {
        res.redirect('/');
    };
};

// funcion para guardar imagenes
ctrl.create = (req, res) => {

    // recursion //
    const saveImage = async () => {
        // funcion para nombre aleatorio
        const imgUrl = randomNumber();
        // hace una busqueda en la base de datos para validar el nombre
        const images = await Image.find({ fileName: imgUrl });
        // validacion para prevenir repeticion de nombres
        if (images.length > 0) {
            saveImage();
        } else {
            // direccion absoluta
            const imageTempPath = req.file.path;
            // entrega nombre del archivo y solo se guarda la extencion del archivo, y se pasa a minuscula
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();
            // directorio de destino, se pasa la extencion
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

            // si el formato de imagen es .png .jpg .jpeg .gif las mueve al directorio almacenado en 'tagetPath' si no elimina el archivo
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                // 'rename' mueve un archivo de un directorio a otro
                await fs.rename(imageTempPath, targetPath);
                // crear modelo y llenar las propiedades para su guardado en la base de datos
                const newImg = new Image({
                    title: req.body.title,
                    descripton: req.body.description,
                    fileName: imgUrl + ext
                });
                // guardar objeto con la informacion de la imagen
                const imageSaved = await newImg.save();
                // una vez guardada la imagen redirecciona a la vista de 
                res.redirect(`/images/${imgUrl}`);
            } else {
                // 'unlink' elimina archivos
                await fs.unlink(imageTempPath);
                // envia un mensaje por consola
                res.status(500).json({ error: 'Only Images are allowed' });
            };
        };
    };
    // funcion recursionada
    saveImage();
};

// funcion para likes
ctrl.like = async (req, res) => {
    // hace una busqueda
    const image = await Image.findOne({ fileName: { $regex: req.params.image_id } });

    if (image) {
        // si encuentra la imagen aumenta sus likes en 1
        image.likes = image.likes + 1;
        await image.save();
        res.json({ likes: image.likes });
    } else {
        res.status(500).json({ error: 'Internal Error' });
    };

};

// funcion para comentar imagenes
ctrl.comment = async (req, res) => {
    // consulta con validacion atravez de una expresion regular {$regex}
    const image = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    if (image) {
        // se crea un  nuevo comentario y se pasa los datos desde req.body
        const newComment = new Comment(req.body);
        // crear propiedad gravatar, cambia email por un hash
        newComment.gravatar = md5(newComment.email);
        // guarda en image_id el id de la imagen 
        newComment.image_id = image._id;
        // guardar comentario
        await newComment.save();
        // redirecciona a la imagen comentada
        res.redirect(`/images/${image.uniqueId}/#${newComment._id}`);
    } else {
        res.redirect('/');
    };
};

// funcion para eliminar imagenes
ctrl.remove = async (req, res) => {
    // consulta
    const image = await Image.findOne({ fileName: { $regex: req.params.image_id } });
    // validacion de consulta
    if (image) {
        // eliminacion de upload
        await fs.unlink(path.resolve(`./src/public/upload/${image.fileName}`));
        // eliminacion de los comentarios
        let flag = true;
        while (flag) {
            const busqueda = await Comment.findOne({image_id: image._id});
            if (busqueda) {
                await Comment.deleteOne({image_id: image._id});
            } else {
                band = false;
            };
        };
        // await Comment.deleteOne({image_id: image._id});
        // eliminacion de la db
        await image.remove();
        res.json(true);
    } else {
        res.status('400').json({ error: 'Not found' });
    };
};


module.exports = ctrl;