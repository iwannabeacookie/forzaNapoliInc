import express from "express";
import Ticket from "./models/ticketModel.js";

const router = express.Router();

router.post("/api/submit-ticket", (req, res) => {
  new Ticket({
    date: Date.now(),
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
  })
    .save()
    .then(() => {
      res.status(200).end();
      // console.log("Ticket successfully written");
    })
    .catch((err) => {
      res.status(500).send(err);
      // console.log("Ticket write operation failed");
    });
});

export default router;
