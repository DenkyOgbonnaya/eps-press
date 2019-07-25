const Post = require('../models/post')

const postService = {
    async create(post){
        try{
          return created = await  Post.create(post);
        }catch(err){
            throw err;
        }
    },
    async getAll(options){
        const{page, limit} = options;
        try{
            return posts = await  Post.find({})
            .skip((page*limit)-limit)
            .limit(limit)
            .sort({createdDate: 'desc'})
            .populate('owner', '-password -createdAt -updatedAt -__v')
        }catch(err){
            throw err;
        }
    },
    async postCount(){
        try{
            return count = Post.countDocuments();
        }catch(err){
            throw err;
        }
    },
    async getOne(postSlug){
        try{
            return post = await  Post.findOne({slug: postSlug}).populate('owner', '-password -createdAt -updatedAt -__v');
          }catch(err){
            throw err;
        }
    },
    async getPost(postId){
        try{
            return post = await  Post.findById(postId).populate('owner', '-password -createdAt -updatedAt -__v');
          }catch(err){
            throw err;
        }
    },
    async like(id, likerId){
        try{
            post = await Post.findById(id);
            post.like(likerId);
            return post;
        }catch(err){
            throw err;
        }
    },
    async unlike(id, likerId){
        try{
            post = await Post.findById(id);
            post.unlike(likerId);
            return post;
        }catch(err){
            throw err;
        }
    },
    async getLikers(postId){
        try{
            const post = await Post.findById(postId);
            return post.likers;
        }catch(err){
            throw err;
        }
    },
    async edit(postId, credentials){
        try{
            return editedPost = await  Post.findByIdAndUpdate(postId, {$set: credentials}, {new: true});
        }catch(err){
            throw err;
        }
    }
}
module.exports = postService;