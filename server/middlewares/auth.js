const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
require('dotenv').config();

const{usernameExist, emailExist} = userService;

module.exports.isLoggedIn = isLoggedIn = (req, res, next) =>{
    const token = req.headers['authorization'] && req.headers['authorization'].replace(/"/g, '')  // ? req.headers['authorization'].substring(7).replace(/"/g, '') : '';
    
    if(!token) return res.status(401 ).send({message: 'unauthorized user'})

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err) {
        console.log(err);
            return res.status(401).send({message: 'unauthorized user.'})
        }
    
        next();
    });
}
module.exports.isAdmin = isAdmin = (req, res, next) => {
    const token =  req.headers['authorization'] && req.headers['authorization'].replace(/"/g, ''); 
    const decoded = jwt.decode(token);

    if(decoded.currentUser.isAdmin !== 1)
        return res.status(401).send({message: 'unauthorized user'})

    next();
}
module.exports.usernameExist = async (req, res, next) => {
    const{username} = req.body;
    try{
        const isUsername = await usernameExist(username);
        if(isUsername)
            return res.status(400).send({status: 'error', message: 'This username is taken'})
            
        next();
    }catch(err){
        throw err
    }
}
module.exports.emailExist = async (req, res, next) => {
    const{email} = req.body;
    try{
        const isEmail = await emailExist(email);
        if(isEmail)
            return res.status(400).send({status: 'error', message: 'This email is taken'})
            
        next();
    }catch(err){
        throw err
    }
}
