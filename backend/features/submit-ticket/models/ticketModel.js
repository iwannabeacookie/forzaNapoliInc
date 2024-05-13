import mongoose from "../../../mongodb/mongodb.js";
import { Schema } from "mongoose";

const ticketSchema = new Schema({
  date: Date,
  phone: String,
  email: String,
  message: String,
});

export default mongoose.model("ticket", ticketSchema);
