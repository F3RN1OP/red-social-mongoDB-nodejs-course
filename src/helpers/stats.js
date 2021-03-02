const { Comment, Image } = require('../models/index.models');

async function imageCounter() {
    // total de documentos en la colleccion
    return await Image.countDocuments();
};

async function commentCounter() {
    return await Comment.countDocuments();
};

async function imageTotalViewsCounter() {
    // toma cada imagen, suma las vistas y los guarda en la una propiedad 'viewsTotal'
    const result = await Image.aggregate([{
        $group: {
            // toma los id
            _id: '1',
            // guarda la suma de las vistas
            viewsTotal: { $sum: '$views' }
        }
    }]);
    // devuelve esto [{_id: '1', viewsTotal: 'total de vistas'}]
    return result[0].viewsTotal;
};

async function likesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$likes' }
        }
    }]);
    return result[0].likesTotal;
};

module.exports = async () => {
    // ejecuta todas las funciones al mismo tiempo
    const results = await Promise.all([
        imageCounter(),
        commentCounter(),
        imageTotalViewsCounter(),
        likesTotalCounter()
    ]);

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    };
};