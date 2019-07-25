const  mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: ['title'],
        slug_padding_size: 4,
        unique: true
      },
    
    content: {
        type: Object,
        required: true
    },
    picture: String,
    likes : {
        type: Number,
        default: 0
    },
    likers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});
postSchema.methods.like = function(likerId) {
    this.likes++;
    this.likers.push(likerId);

    return this.save();
}
postSchema.methods.unlike = function(likerId) {
    this.likes--;
    const likersCopy = this.likers;
    this.likers = likersCopy.filter(liker => liker != likerId );
    
    return this.save();
}

module.exports = mongoose.model('Post', postSchema);