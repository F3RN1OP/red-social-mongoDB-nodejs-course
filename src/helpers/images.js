const { Image }  = require('../models/index.models');

module.exports = {
    async popular() {
        const images = await Image.find()
            // limite de elementos recibidos 9
            .limit(9)
            // de mayor a menor
            .sort({ likes: -1 });
        return images;
    }
};