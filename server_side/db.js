const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URL);
        const c = await mongoose.connect(process.env.mongoDB_URL,{
            dbName : 'demo'
        });        
        console.log(`database connected with ${c.connection.host}`)
    } catch (error) {
        console.log(error.message)
        console.log('database not connected')
    }
}

module.exports = connectDB