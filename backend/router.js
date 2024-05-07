import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { mClient } from "./mongodb/mongodb.js";
import { ObjectId } from "mongodb";
import express from "express";
const router = express.Router();

router.get("/api/user/history", (req, res) => {
  // if (/* not req.body.jwt.is_valid() */ todo) {
  //   res.status(401).send("ERROR: UNAUTHORIZED");
  //   return;
  // }

  let userHistory = mClient
    .db("Data")
    .collection("Users")
    // .findOne({ id: new ObjectId("6636140f667afaeb2c1d6338") })
    .findOne({ email: "buevad@gmail.com" })
    .then(
      (doc) => {
        console.log(doc);
        res.append("Access-Control-Allow-Origin", "http://localhost:5173");
        res.status(200).json(doc);
      },
    )
    .catch(
      (err) => {
        console.log(err);
        res.status(404).json(err);
      },
    );
});

// router.get("/product-list.js", (req, res) => {
//   res.sendFile(join(__dirname, "/product-list.js"));
// });

export default router;
