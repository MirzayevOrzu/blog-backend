const mongoose = require('mongoose');

const BlogPostSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    postedDate: {
        type: Date,
        default: new Date().toISOString()
    },
    htmlContent: {
        type: String,
        require: true,
    },
    postHeading: {
        type: String,
        default: 'Post Heading here',
        required: true,
    },
    postParagraph: {
        type: String,
        required: true,
    },
    postImgUrl: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema);
