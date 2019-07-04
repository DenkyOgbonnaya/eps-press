const events = require('events');
const Comment = require('../models/comment');

const postEmiter = new events.EventEmitter();
postEmiter.on('getPost', async postSlug => {
    try{
        return comments = await Comment.find(postSlug);
    }catch(err){
        throw err;
    }
})
module.exports = postEmiter;