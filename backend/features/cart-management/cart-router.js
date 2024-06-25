import { Router } from "express";
import { getCart, updateCart } from "./cart.js";
const cartRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Cart
 *     description: Cart related endpoints
 */

/**
 * @openapi
 * /cart/update:
 *   post:
 *     tags:
 *        - Cart
 *     description: Updates the old cart to the new one
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - new_cart
 *               - user_id
 *             properties:
 *               new_cart:
 *                 type: object
 *                 description: The new cart to put in place of the old one
 *               user_id:
 *                  type: string
 *                  string: The ID of the user to be updated
 *     responses:
 *       200:
 *         description: Retuns the new cart
 */
cartRouter.post("/cart/update", (req, res) => {
  const reqBody = req.body;
  console.info("Updating cart:", reqBody);
  updateCart(reqBody.new_cart, reqBody.user_id).then((newCart) => {
    console.info("New Cart:", newCart);
    return res
      .status(200)
      .json({ client_id: reqBody.client_id, updated_cart: newCart });
  });
});

/**
 * @openapi
 * /cart/get:
 *   get:
 *     tags:
 *        - Cart
 *     description: Fetches the user's cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *             properties:
 *               user_id:
 *                  type: string
 *                  string: The ID of the user's cart to be fetched
 *     responses:
 *       200:
 *         description: Retuns the user's cart
 */
cartRouter.get("/cart/get/:userId", (req, res) => {
  const userId = req.params.userId;
  console.info("Getting cart:", userId);
  getCart(userId).then((cart) => {
    console.info("Cart:", cart);
    return res.status(200).json({ client_id: reqBody.client_id, cart: cart });
  });
});

export default cartRouter;
