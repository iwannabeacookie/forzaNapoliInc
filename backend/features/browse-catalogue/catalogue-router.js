import express from "express";
import CatalogueItem from "../../models/itemModel.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Catalogue
 *     description: Catalogue and Item related endpoints
 */

/**
 * @openapi
 * /api/catalogue:
 *   get:
 *     tags:
 *       - Catalogue
 *     description: Fetches all items in the catalogue
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   article:
 *                     type: string
 *                     example: "Vodka"
 *                   description_short:
 *                     type: string
 *                     example: "Purest Russian vodka straight from Siberia (to read with Russian accent)"
 *                   description:
 *                     type: string
 *                     example: "Lorem ipsum dolor sit amet..."
 *                   price:
 *                     type: number
 *                     example: 19.99
 *                   imageUrl:
 *                     type: string
 *                     example: "https://example.com/image.jpg"
 *                   sale:
 *                     type: number
 *                     example: 25
 *                   available:
 *                     type: boolean
 *                     example: true
 *       404:
 *         description: Items Not Found
 *       500:
 *         description: Internal Server Error
 */

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
