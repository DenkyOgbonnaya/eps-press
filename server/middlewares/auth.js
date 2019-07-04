const jwt = require('jsonwebtoken');
require('dotenv').config();

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
