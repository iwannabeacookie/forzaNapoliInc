import { mClient } from "./mongodb/mongodb.js";
import { ObjectId } from "mongodb";
import express from "express";

const router = express.Router();

router.post("/api/submit-ticket", (req, res) => {
  mClient
    .db("Data")
    .collection("Tickets")
    .insertOne({
      phone: req.body.phone,
      email: req.body.email,
      message: req.body.message,
    });

  res.status(200);
});

export default router;
