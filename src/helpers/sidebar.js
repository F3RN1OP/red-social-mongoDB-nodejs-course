const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel => {

    // ejecuta funciones al mismo tiempo
    const results = await Promise.all([
        Stats(),
        Images.popular(),
        Comments.newEst()
    ]);
    // pobla el parametro viewModel con esas funciones
    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel;
};