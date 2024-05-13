const mongoose = await import(
  "/Users/aldomunozarellano/Desktop/SoftwareDevelopment/forzaNapoliInc/backend/mongodb/mongodb.js"
).then((mod) => {
  return mod.default;
});
import { Schema } from "mongoose";

const ticketSchema = new Schema({
  date: Date,
  phone: String,
  email: String,
  message: String,
});

export default mongoose.model("ticket", ticketSchema);
