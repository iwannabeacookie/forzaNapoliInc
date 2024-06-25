import mongoose from "../mongodb/mongodb.js";
import reviewModel from "../features/leave-reviews/models/reviewModel.js";
import { Schema } from "mongoose";

const ItemSchema = new Schema({
  article: String,
  description_short: String,
  description: String,
  price: Number,
  imageUrl: String,
  sale: Number,
  available: Boolean,
  reviews: [reviewModel]
});

export default mongoose.model("item", ItemSchema);