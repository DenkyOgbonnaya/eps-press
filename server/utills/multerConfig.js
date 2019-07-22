const multer = require('multer');
const crypto = require('crypto');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if(err) return cb(err)

            cb(null, raw.toString('hex') + path.extname(file.originalname));
        
        });
    }
});
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024
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
 });
module.exports = upload; 