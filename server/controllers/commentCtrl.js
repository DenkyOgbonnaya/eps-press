const commentService = require('../services/commentService');

const commentCtrl = {
    async createComment(req, res){
        try{
            const comment = await commentService.create(req.body)
              res.status(201).send({
                  status: 'success',
                  message: 'Comment successfully created',
                  comment
              })
        }catch(err){
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
    likeComment(req, res){
        const{commentId} = req.params;
        commentService.like(commentId)
        .then( () => {
            return res.status(200).send({status: 'success', message: 'done'})
        })
        .catch(err => res.status(400).send(err) ) 
    },
    async editComment(req, res){
        const{commentId} = req.params;

        try{
            const comment = await commentService.edit(commentId);
            return res.status(200).send({status: 'success', comment})
        }catch(err){
            res.status(400).send(err); 
        }
    },
    async replyComment(req, res){
        const{commentId} = req.params;
        const{ownerId, reply} = req.body;

        const post = await commentService.reply(commentId, {owner: ownerId, text: reply});

        try{

        }catch(err){

        }
    }
}
module.exports = commentCtrl;