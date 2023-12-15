require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Mongoose database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
