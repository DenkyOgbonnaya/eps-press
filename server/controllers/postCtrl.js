const postService = require('../services/postService');
const postEmitter = require('../utills/postEvents');

const postCtrl = {
    async createPost(req, res){
        
        try{
            if(!req.file){
              const post = await postService.create(req.body)
              res.status(201).send({
                  status: 'success',
                  message: 'Post successfully created',
                  post
              })
            }
        }catch(err){
            res.status(400).send(err);          
        }
    },
    async getAllPost(req, res){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;

        try{
          const result = await  postService.getAll({page, limit})
          if(result.docs.length > 0)
            return res.status(200).send({
                status: 'success',
                posts:result.docs,
                page: result.page,
                pages: result.pages,
                total: result.total
            })
            return res.status(404).send({message: 'No available posts'})
        }catch(err){
            res.status(400).send(err)

        }
    },
    async getOnePost(req, res){
        const{postSlug} = req.params;

        try{
            const post = await postService.getOne(postSlug);
            if(post)
                const newPost = post.toObject();

                //event emiter to get post comments
                const comments = await postEmitter.emit('getPost', postSlug);
                newPost.comments = comments;

                return res.status(200).send({
                    status: 'success',
                    post: newPost
                })
            return res.status(404).send({message: 'This post is not available'})
        }catch(err){
            res.status(400).send(err); 
        }
    },
    likePost(req, res){
        const{postId} = req.params;
        postService.like(postId)
        .then( () => {
            return res.status(200).send({status: 'success', message: 'done'})
        })
        .catch(err => res.status(400).send(err) ) 
    },
    async editPost(req, res){
        const{postId} = req.params;

        try{
            const post = await postService.edit(postId);
            return res.status(200).send({status: 'success', post})
        }catch(err){
            res.status(400).send(err); 
        }
    },
    async commentPost(req, res){
        const{postId} = req.params;
        const{ownerId, comment} = req.body;

        const post = await postService.comment(postId, {owner: ownerId, text: comment});

        try{

        }catch(err){

        }
    }
}