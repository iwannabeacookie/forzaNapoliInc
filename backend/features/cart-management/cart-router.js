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
 *   put:
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
 *       400:
 *         description: Returns false, indicating the cart wasn't updated properly due to an error with the request's parameters
 */
cartRouter.put("/cart/update", (req, res) => {
  const reqBody = req.body;
  console.info("Updating cart:", reqBody);
  try {
    updateCart(reqBody.new_cart, reqBody.user_id).then((newCart) => {
      console.info("New Cart:", newCart);
      return res
        .status(200)
        .json({ client_id: reqBody.user_id, updated_cart: newCart });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(false);
  }
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
 *       400:
 *         description: Returns false, indicating the user cart wasn't fetched properly due to an issue with the request
 */
cartRouter.get("/cart/get/:userId", (req, res) => {
  const userId = req.params.userId;
  console.info("Getting cart:", userId);
  try {
    getCart(userId).then((cart) => {
      console.info("Cart:", cart);
      return res.status(200).json({ client_id: userId, cart: cart });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(false);
  }
});

export default cartRouter;
