const mongoose = require("mongoose");

//User schema
const Userschema = new mongoose.Schema({
    issuer: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    VIP: {
        type: Boolean,
        required: true
    },
    newsletter: {
        type: Boolean,
        required: true
    },
    Cart: {
        type: [],
        required: true
    },
    Orders: {
        type: [],
        required: true
    }
});

//User model
//is used to connect a database to a determinated schema
const usercollection = new mongoose.model("user", Userschema);

//export to allow everyone index.js to use it
module.exports = usercollection;