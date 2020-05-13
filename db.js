const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = process.env.dbConnection

mongoose.connect(
    dbConnection,
    {autoIndex:true, useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=>{
    console.log("connected to database !");
})
.catch((err)=>{
console.log(err)

})
