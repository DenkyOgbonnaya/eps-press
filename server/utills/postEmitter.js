const event = require('events');
const fs = require('fs');
const path = require('path');
const{uploader} = require('./cloudinary_setup');
const postService = require('../services/postService');

const postEmitter = new event.EventEmitter();

postEmitter.on('pictureDelete', (publicId) => {
    console.log(publicId);
    
    if(publicId){
        uploader.destroy(publicId, (err, result) => {
            if(err){
                console.log(err);
            } 
        })
    }
    

})
module.exports = postEmitter;