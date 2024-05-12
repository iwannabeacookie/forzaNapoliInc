import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.log("Blyat! Error connecting to MongoDB:", err);
    });
  return mongoose;
}

export default await connect();
