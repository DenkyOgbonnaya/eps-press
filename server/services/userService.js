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
}
module.exports = userService;