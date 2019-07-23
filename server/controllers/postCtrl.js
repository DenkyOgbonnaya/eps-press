const postService = require('../services/postService');
const Comment = require('../models/comment');
const postEmmitter = require('../utills/postEmitter');


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
            }else {
                const{title, content, owner} = req.body;
                const post = await postService.create({
                    title,
                    content,
                    owner,
                    picture: `/uploads/${req.file.filename}`
                })

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
        const limit = Number(req.query.limit) || 3;

        try{
          const posts = await  postService.getAll({page, limit});
          const postCount = await postService.postCount();
          if(posts.length > 0)
            return res.status(200).send({
                status: 'success',
                posts,
                page,
                pages: Math.ceil(postCount/limit),
                total: posts.length
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
            if(post){
                let postCopy = post.toObject();

                const comments = await Comment.find({postSlug: post.slug})
                .populate('owner', '-password -createdAt -updatedAt -__v');
                postCopy.comments= comments;

                return res.status(200).send({
                    status: 'success',
                    post: postCopy
                })
            }
            return res.status(404).send({message: 'This post is not available'})
        }catch(err){
            res.status(400).send(err); 
        }
    },
    async likePost(req, res){
        const{postId} = req.params;
        try{
            const post = await postService.like(postId)
        
            return res.status(200).send({status: 'success', post})
        }catch(err){
            res.status(400).send(err) 
        }
    },
    async editPost(req, res){
        const{postId} = req.params;
        const {title, content} = req.body;

        try{
            if(!req.file){
                const post = await postService.edit(postId, {title, content});
                return res.status(200).send({status: 'success', post})
            }else {
                const post = await postService.getPost(postId);
                post.picture && postEmmitter.emit('pictureDelete', post.picture);

                const editedPost = await postService.edit(postId, {
                    title,
                    content,
                    picture: `/uploads/${req.file.filename}`
                  })
                return res.status(200).send({status: 'success', post: editedPost})
            }
        }catch(err){
            res.status(400).send(err); 
        }
    },
}
module.exports = postCtrl;