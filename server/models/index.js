const mongoose = require('mongoose');
require('dotenv').config();

const{MONGODB_URL, DB} = process.env;

const dbUrl = process.env.MONGODB_URI || MONGODB_URL  //'mongodb://localhost:27017/epspress';

const connectToDb = () => {
    mongoose.connect(dbUrl, {dbName: DB, useNewUrlParser: true})
    .then(() => console.log('connected to eps-press db'))
    .catch(err => console.log(err))
}

module.exports = connectToDb;
