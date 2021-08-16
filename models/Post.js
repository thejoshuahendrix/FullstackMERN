const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = Post = mongoose.model('post', PostSchema);