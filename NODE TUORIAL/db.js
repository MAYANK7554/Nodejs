const mongoose = require('mongoose');
const MongoURL = "mongodb://localhost:27017/db";

mongoose.connect(MongoURL , {
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection;

db.on('connected' , () => {
    console.log("Database is connected");
 });

db.on('error' , () => {
    console.log("Database is disconnected");
 })

 module.exports=db;
 