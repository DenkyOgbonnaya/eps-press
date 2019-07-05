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
    async like(id){
        try{
            post = await Post.findById(id);
            post.like();
            return post;
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