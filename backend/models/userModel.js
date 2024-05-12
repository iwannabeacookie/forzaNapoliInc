import { Schema } from "mongoose";
import Order from "./schemas/orderSchema.js";
import mongoose from "../mongodb/mongodb.js";
// const mongoose = await import(
//   "file:///" + process.env.ROOT_DIR + "/backend/mongodb/mongodb.js"
// ).then((mod) => {
//   return mod.default;
// });

const Userschema = new Schema({
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
  password: {
    type: String,
    required: true,
  },
  salt: {
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
  Cart: {
    type: [],
    required: true,
  },
  orders: {
    type: [Order],
    required: true,
  },
});

export default mongoose.model("user", Userschema);
