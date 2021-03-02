const { Comment, Image } = require('../models/index.models');

module.exports = {

    async newEst() {
        const comments = await Comment.find()
            .limit(5)
            .sort({ timeStamp: -1 });

        // obtiene un comentario del arreglo comments
        for (const comment of comments) {
            const image = await Image.findOne({ _id: comment.image_id });
            comment.image = image;
        }

        return comments;
    }

};