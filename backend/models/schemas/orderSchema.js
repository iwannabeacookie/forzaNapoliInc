import { Schema } from "mongoose";
import OrderItem from "./orderItemSchema.js";

export default new Schema({
  date: Date,
  status: String,
  items: [OrderItem],
});
