import express from "express";
import Item from "../../models/itemModel.js";

const router = express.Router();

router.get("/api/item/:id", (req, res) => {
  Item.findById(req.params.id, {
    _id: 0,
    __v: 0,
    description_short: 0,
  })
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;
