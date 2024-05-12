import express from "express";
import User from "../../models/userModel.js";

const router = express.Router();

/*
 * function isAuthed() {
 *  req.user_id = ...
 * }
 */

router.post("/api/user/history", /* isAuthed() */ (req, res) => {
  User
    .findOne({ _id: req.body._id })
    .then(
      (doc) => {
        console.log(doc);
        res.status(200).json(doc);
      },
    )
    .catch(
      (err) => {
        res.status(404).json(err);
      },
    );

  // ACTUAL CODE:
  // User
  //   .find({ _id: req.user_id })
  //   .then(
  //     (doc) => {
  //       res.status(200).json(doc);
  //     },
  //   )
  //   .catch(
  //     (err) => {
  //       res.status(404).json(err);
  //     },
  //   );
});

export default router;
