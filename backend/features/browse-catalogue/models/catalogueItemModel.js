import mongoose from "../../../mongodb/mongodb.js";
import { Schema } from "mongoose";

const catalogueItemSchema = new Schema({
  article: String,
  description: String,
  price: Number,
  imageUrl: String,
  sale: Number,
  availability: Boolean,
});

export default mongoose.model("item", catalogueItemSchema);
