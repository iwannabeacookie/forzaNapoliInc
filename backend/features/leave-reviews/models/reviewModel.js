import { Schema } from "mongoose";

export default new Schema({
  userName: String,
  userSurname: String,
  userId: String,
  certified: Boolean,
  text: String,
});
