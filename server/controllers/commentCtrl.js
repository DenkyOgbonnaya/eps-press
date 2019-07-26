const commentService = require('../services/commentService');

const commentCtrl = {
    async createComment(req, res){
        try{
            const comment = await commentService.create(req.body)
            console.log(comment)
              res.status(201).send({
                  status: 'success',
                  message: 'Comment successfully created',
                  comment
              })
        }catch(err){
            console.log(err)
            res.status(400).send(err);          
        }
    },
    async getOneComment(req, res){
        const{commentId} = req.params;

        try{
            const comment = await commentService.getOne(commentId);
            if(comment)
                return res.status(200).send({
                    status: 'success',
                    comment
                })
            return res.status(404).send({message: 'This comment is not available'})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async likeComment(req, res){
        const{id} = req.params;
        const{liker} = req.body;
        try{
            const comment = await commentService.like(id, liker);
            return res.status(200).send({status: 'success', likers: comment.likers})
        }catch(err){
            res.status(400).send(err) 
        } 
    },
    async unlikeComment(req, res){
        const{id} = req.params;
        const{unliker} = req.body;
        try{
            const comment = await commentService.unlike(id, unliker);
            return res.status(200).send({status: 'success', likers: comment.likers})
        }catch(err){
            res.status(400).send(err) 
        } 
    },
    async editComment(req, res){
        const{commentId} = req.params;

        try{
            const comment = await commentService.edit(commentId, {text: req.body.text});
            return res.status(200).send({status: 'success', comment})
        }catch(err){
            res.status(400).send(err); 
        }
    },
    async replyComment(req, res){
        const{commentId} = req.params;
        const{owner, text} = req.body;

        try{
            const replies = await commentService.reply(commentId, {owner, text});
            return res.status(200).send({status: 'success', replies})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async deleteComment(req, res){
        const{commentId} = req.params;
        try{
            const deleted = await commentService.delete(commentId);
            return res.status(200).send({status: 'success'})
        }catch(err){
            res.status(400).send(err);
        }
    }
}
module.exports = commentCtrl;