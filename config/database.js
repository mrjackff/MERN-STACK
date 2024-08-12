const mongoose = require('mongoose');

module.exports = () => {
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log('DB connected successfully');
    }catch(err){
        console.log('Connection error', err);
        throw err;
    }
}