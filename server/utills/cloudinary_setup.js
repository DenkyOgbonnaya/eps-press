const cloudinary = require('cloudinary');
require('dotenv').config();

const cloudinaryConfig = (req, res, next) => {

    const{CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env;
    
    cloudinary.config({
    cloud_name: 'diibyv2i7', // CLOUDINARY_CLOUD_NAME,
    api_key: '363346983382224',  //CLOUDINARY_API_KEY,
    api_secret: 'LBbLARPHQaChrNtezDbBOqR3ePA' //CLOUDINARY_API_SECRET,
    });
    next();
    }
    const uploader = cloudinary.uploader;
module.exports = { cloudinaryConfig, uploader };
