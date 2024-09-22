const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_CONNECT_URI;

const connectDB = async () => {
    try {
        const conn= await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`db connected ${conn.connection.host}`);
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;