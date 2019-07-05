const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postSlug: {
        type: String,
        required: true
    },
    likes : {
        type: Number,
        default: 0
    },
    replies: [
        {
            owner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: String
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now()
    }
});
commentSchema.methods.like = function() {
    this.likes += 1;
    return this.save()
}
commentSchema.methods.reply = function(reply) {
    this.replies.push(reply)
    return this.save()
}
module.exports = mongoose.model('Comment', commentSchema)
