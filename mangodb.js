require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI).then(() =>{
    console.log("mongodb connected");
}).catch((err) => {
    console.log(err);
})

//User schema
const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//User model
//is used to connect a database to a determinated schema
const usercollection = new mongoose.model("user", Userschema);

//export to allow everyone index.js to use it
module.exports = usercollection;