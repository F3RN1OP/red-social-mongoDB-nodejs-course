// ARCHIVO CON FUNCIONES REUTILIZABLES 

const moment = require('moment');

const helpers = {};

// funcion toma fechas y las convierte en un formato legible
helpers.timeAgo = timeStamp => {
    // apartir del tiempo en timeStamp publica en minutos cuanto a pasado
    return moment(timeStamp).startOf('minute').fromNow()
}



module.exports = helpers;