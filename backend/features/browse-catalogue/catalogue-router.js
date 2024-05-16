import express from "express";
import CatalogueItem from "./models/catalogueItemModel.js";

const router = express.Router();

router.get("/api/catalogue", (req, res) => {
  CatalogueItem.find({})
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;
