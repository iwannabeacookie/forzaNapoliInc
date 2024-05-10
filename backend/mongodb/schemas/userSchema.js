import { Schema } from "mongoose";
import mongoose from "../mongodb.js";
import Order from "./orderSchema.js";

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
