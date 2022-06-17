const mongoose = require('mongoose');

//const adressDB = process.env.MONGO_DB_URI || "mongodb://docker:mongopw@localhost:49157";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb://localhost:8081");

        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;