import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { mClient } from "./mongodb/mongodb.js";
import { ObjectId } from "mongodb";
import express from "express";
const router = express.Router();

router.post("/api/user/history", (req, res) => {
  // if (/* not req.body.jwt.is_valid() */ todo) {
  //   res.status(401).send("ERROR: UNAUTHORIZED");
  //   return;
  // }

  console.log(req.body);
  mClient
    .db("Data")
    .collection("Users")
    .findOne({ _id: new ObjectId(req.body._id) })
    // .findOne({ email: "buevad@gmail.com" })
    .then(
      (doc) => {
        console.log(doc);
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
