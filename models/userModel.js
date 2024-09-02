const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    dp:{
        type:Buffer,
        default: '../public/images/image.png'
    },
    name: String,
    age: Number,    
    email: String,
    password: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
})

module.exports = mongoose.model("user", userSchema);