import express from "express";
import Item from "../../models/itemModel.js";

const router = express.Router();

/**
 * @openapi
 * /api/item/{id}:
 *   get:
 *     tags:
 *       - Catalogue
 *     description: Fetches an item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to fetch
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
 *                 _id:
 *                   type: string
 *                   example: "60c72b2f9b1d8b3a2c8e4d5c"
 *                 article:
 *                   type: string
 *                   example: "Article Name"
 *                 description_short:
 *                   type: string
 *                   example: "Short Description"
 *                 description:
 *                   type: string
 *                   example: "Full Description"
 *                 price:
 *                   type: number
 *                   example: 19.99
 *                 imageUrl:
 *                   type: string
 *                   example: "http://example.com/image.jpg"
 *                 sale:
 *                   type: number
 *                   example: 10
 *                 available:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Not Found
 *
 *       500:
 *         description: Internal Server Error
 */

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
