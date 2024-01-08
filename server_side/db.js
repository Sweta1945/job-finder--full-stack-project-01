const mongoose = require("mongoose");
require('dotenv').config();

async function ConnectionToDB() {

    try{
    console.log(process.env.MONGODB_URL);
    const result = await mongoose.connect(process.env.mongoDB_URL,{
        dbName : 'demo'
    });
    // console.log(result);

    console.log('connected to db');
    }catch(e){
        console.log("Error in connection",e.message);
    }
    return null;
}

module.exports = {
    ConnectionToDB
}