const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    active: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Active'
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Post", PostSchema);

// {
//     image: "url",
//     title: "hello",
//     content: "hello",
//     author: {
//         /// author
//     },
//     active: {
//         /// active 
//     },
// }