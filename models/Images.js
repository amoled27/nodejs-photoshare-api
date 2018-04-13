const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    createdAt: String,
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Image', ImageSchema);