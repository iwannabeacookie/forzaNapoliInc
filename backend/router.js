import { Router } from "express";
import { updateCart, getCart } from "./comps/cart.js";
export const cartRouter = Router();

cartRouter.post("/cart/update", (req, res) => {
  const reqBody = req.body;
  console.info("Updating cart:", reqBody);
  updateCart(reqBody.new_cart, reqBody.user_id).then((newCart) => {
    console.info("New Cart:", newCart);
    res.json({ client_id: reqBody.client_id, updated_cart: newCart });
  });
});

cartRouter.post("/cart/get", (req, res) => {
  const reqBody = req.body;
  console.info("Getting cart:", reqBody);
  getCart(reqBody.user_id).then((cart) => {
    console.info("Cart:", cart);
    res.json({ client_id: reqBody.client_id, cart: cart });
  });
});
