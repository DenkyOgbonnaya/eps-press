const Comment = require('../models/comment')

const commentService = {
    async create(comment){
        try{
          return created = await  Comment.create(comment);
        }catch(err){
            throw err;
        }
    },
    async getOne(id){
        try{
            return comment = await  Comment.findById(id).populate('owner').populate('replies.owner');
          }catch(err){
            throw err;
        }
    },
    async like(id){
        try{
            comment = await  Comment.findById(id);
            return this.comment.like().exec()
        }catch(err){
            throw err;
        }
    },
    async reply(id, credentials){
        try{
            comment = await  Comment.findById(id);
            return comment.reply(credentials);
        }catch(err){
            throw err;
        }
    },
    async edit(commentId, ownerId){
        try{
            return editedPost = await  Comment.findOneAndUpdate({_id: commentId, owner: ownerId}, {new: true});
        }catch(err){
            throw err;
        }
    }
}
module.exports = commentService;