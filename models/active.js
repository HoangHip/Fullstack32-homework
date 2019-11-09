const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true,
});

const ActiveSchema = new Schema({
    likes: {
        type: Number,
        default: 0
    },
    comments: [CommentSchema],
    views: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("Active", ActiveSchema);