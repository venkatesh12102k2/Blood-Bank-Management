const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.green);
    }catch(err){
        console.log(`MongoDB Connection Error ${err}`.red);
    }
}

module.exports = connectDB;