// ARCHIVO CON FUNCIONES REUTILIZABLES

// objeto con funciones
const helpers = {};

// funcion para numeros aleatorios
helpers.randomNumber = () => {
    // constante con caracteres para generar nombre
    const possible = 'abcdfghijklmnopqrstuvwxyz';
    let randomNumber = 0;
    for (let i = 0; i < 6; i++) {
        // charAt selecciona 1 caracter que este en la posicion que genere Math.random
        // Math.floor redondea al por menor
        // Math.random da un numero aleatorio dentro de la longitud de "possible"
        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    return randomNumber;
};

module.exports = helpers;