const event = require('events');
const fs = require('fs');
const path = require('path');
const postService = require('../services/postService');

const postEmitter = new event.EventEmitter();

postEmitter.on('pictureDelete', (picture) => {

    const image = JSON.stringify(picture).replace('/', '');
    const img = path.resolve("public", image).replace(/\"/g, '');

    fs.unlink(img, (err) => {
        if(err)
            throw err;
    })    
})
module.exports = postEmitter;