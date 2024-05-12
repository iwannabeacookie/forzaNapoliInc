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
    unique: true,
  },
  VIP: {
    type: Boolean,
    required: true,
  },
  newsletter: {
    type: Boolean,
    required: true,
  },
  Cart: {
    type: [],
    required: true,
  },
  Orders: {
    type: [],
    required: true,
  },
});

//User model
//is used to connect a database to a determinated schema
const googlecollection = new mongoose.model("google_user", Googleschema);

//export to allow everyone index.js to use it
export default googlecollection;
