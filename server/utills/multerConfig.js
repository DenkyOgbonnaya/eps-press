const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const datauri = require('datauri');

const storage = multer.memoryStorage();
const multerUploads = multer({ 
    storage ,
    limits: {
        fileSize: 1 * 1024 * 1024 //1mb
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|png|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

        if(mimetype && extname){
            return cb(null, true);
        }
        cb(new Error(`Only the following image types are supported ${filetypes}`))
    }
}).single('image');
const dUri = new datauri();

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = {multerUploads, dataUri};