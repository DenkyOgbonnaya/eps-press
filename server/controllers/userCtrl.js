const bcrypt = require('bcrypt');
const userEmitter = require('../utills/userEmitter');
const userService = require('../services/userService');

const userCtrl = {
    async createUser(req, res){
        try{
            const{username, email, password} = req.body;
            const hashedPassword = bcrypt.hashSync(password, 8);
        
            const newUser = await userService.create({
                username,
                email,
                password: hashedPassword
            }); 
            //generate a token and append to newUser object
            userEmitter.emit('userAuth', newUser);
            return res.status(201).send({
                status: 'success',
                token: newUser.token
            })
        }catch(err){
            res.status(500).send(err)
        }
        
    },
    async loginUser(req, res){
        const{username, password} = req.body;
        try{
            const user = await userService.usernameExist(username);
            if(!user)
                return res.status(401).send({
                status: 'error',
                message: 'incorrect email and password combination!'})
            
            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword)
                return res.status(401).send({
                    status: 'error',
                    message: 'incorrect email and password combination'
                })
            //generate token and appen to user object
            userEmitter.emit('userAuth', user);

            return res.status(200).send({status: 'success', token: user.token})
        }catch(err){
            console.log(err)
            res.status(400).send(err);
        }
    },

}
module.exports = userCtrl;