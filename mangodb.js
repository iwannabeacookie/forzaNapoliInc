require('dotenv').config()
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("mongodb connected");
}).catch((err) => {
    console.log(err);
})

mongoose.connection.useDb('foza_napoli');

//User schema
const Userschema = new mongoose.Schema({
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

mongoose.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
});

//User model
//is used to connect a database to a determinated schema
const usercollection = new mongoose.model("user", Userschema);

//export to allow everyone index.js to use it
module.exports = usercollection;