import express from "express";
import usercollection from "../user-auth/models/userModel.js";
import itemModel from "../../models/itemModel.js";
import { checkAuth } from "../../helpers/auth.js";

const reviewRouter = express.Router();

/**
 * @openapi
 * /review:
 *   post:
 *     tags:
 *       - Item
 *     description: Add a review to the reviews array of an item
 *     parameters:
 *       - name: sessionid
 *         in: body
 *         required: true
 *         description: The ID of the user's session
 *         schema:
 *           type: string
 *       - name: itemid
 *         in: body
 *         required: true
 *         description: The ID of the item to add the review
 *         schema:
 *            type: string
 *       - name: comment
 *         in: body
 *         required: true
 *         description: The cotent of the review
 *         schema:
 *            type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           string
 *       404:
 *         description: Not Found
 *
 *       500:
 *         description: Internal Server Error
 */

reviewRouter.post("/review", checkAuth, async (req, res) => {
  req.sessionStore.get(req.body.sessionid, async (error, session) => {
    if (session) {
      if (session.passport) {
        const user = await usercollection.findById(session.passport.user.id);
        const citem = await itemModel.findById(req.body.itemid);
        const order = user.orders.find((order) =>
          order.items.some((item) => item.article === citem.article),
        );
        const review = {
          userName: user.name,
          userSurname: user.surname,
          userId: user._id,
          certified: false,
          text: req.body.comment,
        };
        if (order) {
          review.certified = true;
        }
        citem.reviews.push(review);
        citem.save();
        res.status(200).send("review added");
      }
    }
  });
});

export default reviewRouter;
