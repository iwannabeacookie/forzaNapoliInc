import { Schema } from "mongoose";

export const CartItem = Schema({
  productId: { type: String, ref: "Product" },
  productName: { type: String, default: "" },
  imageUrl: { type: String, default: "" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
