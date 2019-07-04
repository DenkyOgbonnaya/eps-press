const  mongoose = require('mongoose');
const slug = require('mongoos-slug-generator');
const paginate = require('mongoose-paginate');

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
        type: String,
        required: true
    },
    likes : {
        type: Number,
        default: 0
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
postSchema.methods.like = function() {
    this.like += 1;
    return this.save()
}
postSchema.plugin(paginate);

module.exports = mongoose.model('Post', postSchema);