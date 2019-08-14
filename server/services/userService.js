const User = require('../models/user');

const userService = {
    async create(user){
        try{
            return user = await User.create(user);
        }catch(err){
            throw err;
        }
    },
    async usernameExist(username){
        try{
            return user = await User.findOne({username});
        }catch(err){
            throw err;
        }
    },
    async emailExist(email){
        try{
            return user = await User.findOne({email});
        }catch(err){
            throw err;
        }
    },
    async changeAvatar(id, avatar){
        try{
            return user = await User.findByIdAndUpdate(id, {avatar}, {new: true});
        }catch(err){
            throw err;
        }
    },
    async getUser(username){
        try{
            return user = await User.findOne({username}, {password: 0});
        }catch(err){
            throw err;
        }
    },
    async getUsers(options){
        const{page, limit} = options;
        try{
            return users = await User.find({}, {password: 0})
            .skip((page*limit)-limit)
            .limit(limit)
        }catch(err){
            throw err;
        }
    },
    async userCount(){
        try{
            return count = User.countDocuments();
        }catch(err){
            throw err;
        }
    },
    async makeAdmin(userId){
        try{
            return user = User.findByIdAndUpdate(userId, {$set: {isAdmin: 1}}, {new:true});
        }catch(err){
            throw err;
        }
    },
    async disAdmin(userId){
        try{
            return user = User.findByIdAndUpdate(userId, {$set: {isAdmin: 0}}, {new:true});
        }catch(err){
            throw err;
        }
    },
}
module.exports = userService;