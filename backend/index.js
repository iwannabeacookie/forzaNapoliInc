import express from "express";
const app = express();
const port = 3000;
export const mClient = import("./mongodb/mongodb.js"); // Remember to add your ip to the allowed list!!!
import { updateCart } from "./comps/cart.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello From the other side");
});

app.post("/cart/update", (req, res) => {
  const reqBody = req.body;
  console.info("Updating cart:", reqBody);
  updateCart(reqBody.new_cart, reqBody.client_id).then((newCart) => {
    console.info("New Cart:", newCart);
    res.send({ client_id: reqBody.client_id, new_cart: newCart });
  });
});

app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});
