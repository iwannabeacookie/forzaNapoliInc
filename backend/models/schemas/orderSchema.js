import { Schema } from "mongoose";
import Item from "./itemSchema.js";

export default new Schema({
  date: Date,
  status: String,
  items: [Item],
});
