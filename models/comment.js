const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    postId:{
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        max: 1000
    },
    img: {
        type: String,
    },
},
{timestamps: true})

module.exports = mongoose.model('Comment', CommentSchema)