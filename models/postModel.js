const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image: Buffer,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }]
})

module.exports = mongoose.model("post", postSchema);