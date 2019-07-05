const events = require('events');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userEmitter = new events.EventEmitter()

userEmitter.on('userAuth', user => {
    const token = jwt.sign(
    {currentUser: {_id: user._id, username: user.username, email: user.email}},
    process.env.SECRET_KEY,
    {expiresIn: '24h'} ) //24hrs
    
    user.token = token;
})
module.exports = userEmitter;