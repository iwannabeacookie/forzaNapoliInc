import morgan from "morgan";
import cors from "cors";
import express from "express";
import router from "./router.js";
const app = express();
const port = 3000;
export const mClient = import("./mongodb/mongodb.js");

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("helo");
});

app.listen(port, async () => {
  console.log(`running at http://localhost:${port}`);
});

app.use(router);
