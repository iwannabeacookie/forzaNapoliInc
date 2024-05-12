import UserSchema from "./mongodb/schemas/userSchema.js";
import userSchema from "./mongodb/schemas/userSchema.js";

/*
 * @param newCart: [{
    "product_id": number,
 }]
 */
export async function updateCart(newCart, customer_id) {
  console.info("Customer Id:", customer_id, "\n New Cart:", newCart);
  await userSchema.updateOne({ _id: customer_id }, { $set: { cart: newCart } });
  return await userSchema.findOne({ _id: customer_id });
}

export async function getCart(customer_id) {
  const user = await UserSchema.findOne({ _id: customer_id });
  console.info("User:", user);
  return user;
}
