// for future development
const mongoose = require('mongoose');

const LinkSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        require: true,
    },
    imgUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Link', LinkSchema);
