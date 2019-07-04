const User = require('../models/user');

const userService = {
    async create(user){
        try{
            return user = await User.create(user);
        }catch(err){
            throw err;
        }
    },
    async getUser(username){
        try{
            return user = await User.findOne({username});
        }catch(err){
            throw err;
        }
    }
}
module.exports = userService;