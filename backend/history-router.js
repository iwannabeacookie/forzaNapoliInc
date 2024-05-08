import { mClient } from "./mongodb/mongodb.js";
import { ObjectId } from "mongodb";
import express from "express";

const router = express.Router();

router.post("/api/user/history", (req, res) => {
  // if (/* not req.body.jwt.is_valid() */ todo) {
  //   res.status(401).send("ERROR: UNAUTHORIZED");
  //   return;
  // }

  mClient
    .db("Data")
    .collection("Users")
    .findOne({ _id: new ObjectId(req.body._id) })
    .then(
      (doc) => {
        res.status(200).json(doc);
      },
    )
    .catch(
      (err) => {
        res.status(404).json(err);
      },
    );
});

export default router;
