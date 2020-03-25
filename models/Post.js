const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    userName: String,
    body: String,
    createdAt: String,
    comments: [
        {
            body: String,
            userName: String,
            createdAt: String
        }
    ],
    like: [
        {
            userName: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Post', postSchema);