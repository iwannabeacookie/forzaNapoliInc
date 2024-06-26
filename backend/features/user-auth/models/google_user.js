import mongoose from "mongoose";

//User schema
const Googleschema = new mongoose.Schema({
  issuer: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  googleID: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  VIP: {
    type: Boolean,
    required: true,
  },
  newsletter: {
    type: Boolean,
    required: true,
  },
  cart: {
    type: [],
    required: true,
  },
  orders: {
    type: [],
    required: true,
  },
});

//User model
//is used to connect a database to a determinated schema
const googlecollection = new mongoose.model("users", Googleschema);

//export to allow everyone index.js to use it
export default googlecollection;
