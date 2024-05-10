import { Schema } from "mongoose";

export default new Schema({
  article: String,
  quantity: Number,
  price: Number,
});
