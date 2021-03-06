const postService = require('../services/postService');
const Comment = require('../models/comment');
const postEmmitter = require('../utills/postEmitter');
const{dataUri} = require('../utills/multerConfig');
const{uploader} = require('../utills/cloudinary_setup')


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
                const file = dataUri(req).content;
                const result = await uploader.upload(file);
                const{title, content, owner} = req.body;

                const post = await postService.create({
                    title,
                    content,
                    owner,
                    picture: result.url,
                    publicId: result.public_id
                })

                res.status(201).send({
                  status: 'success',
                  message: 'Post successfully created',
                  post
              })
            }
        }catch(err){
            console.log(err)
            res.status(400).send(err);          
        }
    },
    async getAllPost(req, res){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        try{
          const posts = await  postService.getAll({page, limit});
          const postCount = await postService.postCount();
          return res.status(200).send({
            status: 'success',
            posts,
            page,
            pages: Math.ceil(postCount/limit),
            total: posts.length
        })
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

                const comments = await Comment.find({post: post._id})
                .populate('owner', '-password -createdAt -updatedAt -__v')
                .populate('replies.owner', '-password -createdAt -updatedAt -__v');
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
        const{liker} = req.body;
        try{
            const post = await postService.like(postId, liker)
        
            return res.status(200).send({status: 'success', likers: post.likers})
        }catch(err){
            res.status(400).send(err) 
        }
    },
    async unlikePost(req, res){
        const{postId} = req.params;
        const{unLiker} = req.body;
        try{
            const post = await postService.unlike(postId, unLiker);
        
            return res.status(200).send({status: 'success', likers: post.likers});
        }catch(err){
            res.status(400).send(err) 
        }
    },
    async getPostLikers(req, res){
        const postLikers = await postService.getLikers();
        return res.status(200).send({status: 'success', postLikers});

        try{}catch(err){
            res.status(400).send(err);
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
                const file = dataUri(req).content;
                const result = await uploader.upload(file);

                const post = await postService.getPost(postId);
                post.picture && postEmmitter.emit('pictureDelete',  post.publicId);

                const editedPost = await postService.edit(postId, {
                    title,
                    content,
                    picture: result.url,
                    publicId: result.public_id
                  })
                return res.status(200).send({status: 'success', post: editedPost})
            }
        }catch(err){
            res.status(400).send(err); 
        }
    },
    async deletePost(req, res){
        const{postId} = req.params;
        try{
            const deletedPost = await postService.delete(postId);
            deletedPost.picture && postEmmitter.emit('pictureDelete',  deletedPost.publicId);

            return res.status(200).send({status: 'success'})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async getUserPost(req, res){
        const{userId} = req.params;
        try{
            const posts = await postService.userPost(userId);
            return res.status(200).send({status: 'success', posts})
        }catch(err){
            res.status(400).send(err);
        }
    },
    async searchPost(req, res){
        const{search} = req.query;
        const limit = 10;
        
        const query = {};
        if(search)
            query.title = {$regex: search, $options: 'i'};
        try{
            const posts = await postService.search(query);
            
            if(posts)
            return res.status(200).send({
                status: 'success',
                posts,
                page: 1,
                pages: Math.ceil(posts.length/limit)
                
            })
            return res.status(401).send({status: 'failed', message: 'post not found'})
        }catch(err){
            res.status(500).send(err);
        }
    },

}
module.exports = postCtrl;