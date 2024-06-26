import express from "express";
import User from "../user-auth/models/userModel.js";
import { checkAuth } from "../../helpers/auth.js";

const router = express.Router();

/**
 * @openapi
 * /api/{userid}/history:
 *   get:
 *     tags:
 *       - User
 *     description: Fetches the history for a specific user by their ID
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         description: The ID of the user to fetch the history for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: Date
 *                   example: "2022-10-12T07:20:50.52Z"
 *                 status:
 *                   type: String
 *                   example: "Delivered"
 *                 items:
 *                   type: Array
 *
 *       404:
 *         description: User not found
 *
 *       500:
 *         description: Internal Server Error
 */

router.get("/api/:userid/history", (req, res) => {
  User.findOne({ _id: req.params.userid })
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;
