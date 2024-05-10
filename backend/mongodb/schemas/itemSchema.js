import { Schema } from "mongoose";
import mongoose from "../mongodb.js";

export default new Schema({
  article: String,
  quantity: Number,
  price: Number,
});
