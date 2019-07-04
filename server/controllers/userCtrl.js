const bcrypt = require('bcryptjs');
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
            const token = userEmitter.emit('userAuth', newUser);
               
            return res.status(201).send({
                status: 'success',
                token
            })
        }catch(err){
            res.status(500).send(err)
        }
        
    },
    async loginUser(req, res){
        const{username, password} = req.body;
        try{
            const user = await userService.getUser(username);
            if(!user)
                return res.status(401).send({
                status: 'error',
                message: 'incorrect email and password combination!'})
            
            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword)
                return res.status(401).send({
                    status: error,
                    message: 'incorrect email and password combination'
                })
            const token = userEmitter.emit('userAuth', user);

            return res.status(200).send({status: 'success', token})
        }catch(err){
            res.status(400).send(err);
        }
    },
}
module.exports = userCtrl;