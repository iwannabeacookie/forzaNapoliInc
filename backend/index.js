import express from "express";
const app = express();
const port = 3000;
export const mClient = import("./mongodb/mongodb.js"); // Remember to add your ip to the allowed list!!!
import { updateCart, getCart } from "./comps/cart.js";
import cors from "cors"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello From the other side");
});

app.post("/cart/update", (req, res) => {
  const reqBody = req.body;
  console.info("Updating cart:", reqBody);
  updateCart(reqBody.new_cart, reqBody.user_id).then((newCart) => {
    console.info("New Cart:", newCart);
    res.json({ client_id: reqBody.client_id, updated_cart: newCart });
  });
});

app.post("/cart/get", (req, res) => {
  const reqBody = req.body;
  console.info("Getting cart:", reqBody);
  getCart(reqBody.user_id).then((cart) => {
    console.info("Cart:", cart);
    res.json({ client_id: reqBody.client_id, cart: cart });
  });
});

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
