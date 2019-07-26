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
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes : {
        type: Number,
        default: 0
    },
    likers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
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
commentSchema.methods.like = function(liker) {
    this.likes += 1;
    this.likers.push(liker);
    return this.save()
}
commentSchema.methods.unlike = function(unliker) {
    this.likes--;
    const likersCopy = this.likers;
    this.likers = likersCopy.filter(liker => liker != unliker );
    
    return this.save();
}
commentSchema.methods.reply = function(reply) {
    this.replies.push(reply)
    return this.save()
}
module.exports = mongoose.model('Comment', commentSchema)
