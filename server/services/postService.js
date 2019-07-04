const Post = require('../models/post')

const postService = {
    async create(post){
        try{
          return created = await  Post.create(post);
        }catch(err){
            throw err;
        }
    },
    async getAll(queryParams){
        try{
            return posts = await  Post.paginate({}, queryParams)
            .sort({createdDate: 'desc'})
        }catch(err){
            throw err;
        }
    },
    async getOne(postSlug){
        try{
            return post = await  Post.findOne({postSlug}).populate('owner');
          }catch(err){
            throw err;
        }
    },
    async like(id){
        try{
            post = await  Post.findById(id);
            return post.like().exec()
        }catch(err){
            throw err;
        }
    },
    async comment(id, credentials){
        try{
            post = await  Post.findById(id);
            return post.comment(credentials);
        }catch(err){
            throw err;
        }
    },
    async edit(postId, ownerId){
        try{
            return editedPost = await  Post.findOneAndUpdate({_id: postId, owner: ownerId}, {new: true});
        }catch(err){
            throw err;
        }
    }
}
module.exports = postService;