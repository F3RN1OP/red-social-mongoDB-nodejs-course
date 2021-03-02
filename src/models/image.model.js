// MODELO PARA IMAGENES

// modulo de conexion a la base de datos
const mongoose = require('mongoose');

// constructor Schema y model
const { Schema } = mongoose;

const path = require('path');

// instaciar un esquema
const imageSchema = new Schema({
    title: { type: String },
    descripton: { type: String },
    fileName: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timeStamp: { type: Date, default: Date.now }
});

// propiedad para el esquema que no se va a guardar en la base de datos
// variable virtual que quita la extencion del archivo guardando solo el nombre
imageSchema.virtual('uniqueId')
    .get(function () {
        // remplaza el nombre de la extencion por nada
        return this.fileName.replace(path.extname(this.fileName), '')
    })

// se usa el esquema para establecer el modelo de dato de las imagenes
module.exports = mongoose.model('Image', imageSchema)