const mongoose = require("mongoose");
//const connect we need to create a database

//User schema
//we need to fill it up with all the parameters
const Userschema = new mongoose.Schema({
    nome: {
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
//insted of user we have to put the collection name
const usercollection = new mongoose.model("user", Userschema);

//export to allow everyone index.js to use it
module.exports = usercollection;