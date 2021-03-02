// ARCHIVO PARA RETORNAR TODOS LOS MODELOS EN EL DIRECTIORIO 'MODELS'


// objeto que retorna todos los modelos
module.exports = {
    // modelo de imagenes
    Image: require('./image.model'),
    Comment: require('./comment.model')
};