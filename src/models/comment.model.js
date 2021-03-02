// MODELO PARA COMENTARIOS

// constructor Schema y model
const { Schema, model } = require('mongoose');

const ObjectId = Schema.ObjectId;

const path = require('path');

// instaciar un esquema
const commentSchema = new Schema({
    // ObjetcId especica a la propiedad que es un id de otra collecion
    image_id: { type: ObjectId },
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timeStamp: { type: Date, default: Date.now }
});

// establecer propiedad virtual
commentSchema.virtual('image')
        // establece un valor
    .set(function (image) {
            // se guarda el objeto pasado por paramentros en una propiedad privada
        this._image = image;
    })
    .get(function () {
            // una vez utilizada devuelve la propiedad privada
        return this._image;
    });


// se usa el esquema para establecer el modelo de dato de las imagenes
module.exports = model('Comment', commentSchema)