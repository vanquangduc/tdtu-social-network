const mongoose = require('mongoose')

const AnnouncementSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    faculty:{
        type: String,
        require: true,
    },
    file:{
        type: Array,
        default: ""
    },
    
},
{timestamps: true})

module.exports = mongoose.model('Announcement', AnnouncementSchema)