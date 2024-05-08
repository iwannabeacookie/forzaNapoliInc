import express from "express";
const app = express();
const port = 3000;
export const mClient = import("./mongodb/mongodb.js"); // Remember to add your ip to the allowed list!!!
import cors from "cors";
import { cartRouter } from "./router.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cartRouter);

app.get("/", (req, res) => {
  res.send("Hello From the other side");
});

app.post("/", (req, res) => {
  res.send("Hello From the other side");
});

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
