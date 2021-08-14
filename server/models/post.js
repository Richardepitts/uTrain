const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: 'Content is required',
            text: true
        }
    }
);

module.exports = mongoose.model('Post', postSchema);
