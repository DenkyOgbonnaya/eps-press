const Comment = require('../models/comment')

const commentService = {
    async create(comment){
        try{
          let created = await  Comment.create(comment)
          
        created = await created
        .populate('owner', '-password -createdAt -updatedAt -__v').execPopulate();
        
        return created;
        }catch(err){
            throw err;
        }
    },
    async getOne(id){
        try{
            return comment = await  Comment.findById(id)
            .populate('owner', '-password -createdAt -updatedAt -__v')
            .populate('replies.owner', '-password -createdAt -updatedAt -__v');
          }catch(err){
            throw err;
        }
    },
    async like(id, liker){
        try{
            comment = await  Comment.findById(id);
            comment.like(liker);
            return comment;
        }catch(err){
            throw err;
        }
    },
    async unlike(id, unliker){
        try{
            comment = await  Comment.findById(id);
            comment.unlike(unliker);
            return comment;
        }catch(err){
            throw err;
        }
    },
    async reply(id, credentials){
        try{
            let comment = await  Comment.findById(id);
            comment.reply(credentials);
            comment = await comment.populate("replies.owner", '-password -createdAt -updatedAt -__v')
            .execPopulate();
            return comment.replies;
        }catch(err){
            throw err;
        }
    },
    async edit(commentId, text){
        try{
            return editedPost = await  Comment.findByIdAndUpdate(commentId, {$set: text}, {new: true});
        }catch(err){
            throw err;
        }
    },
    async delete(id){
        try{
            return deleted = await Comment.findByIdAndRemove(id);
        }catch(err){
            console.log(err);
        }
    }
}
module.exports = commentService;