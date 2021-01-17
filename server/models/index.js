const mongoose = require('mongoose');
require('dotenv').config();

const{MONGODB_URL, DB, DB_USER, DB_PASS} = process.env;

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.p1shx.mongodb.net/`;  //process.env.MONGODB_URI || MONGODB_URL  //'mongodb://localhost:27017/epspress';

const connectToDb = () => {
    mongoose.connect(dbUrl, {dbName: DB, useNewUrlParser: true})
    .then(() => console.log('connected to eps-press db'))
    .catch(err => console.log(err))
}

module.exports = connectToDb;
