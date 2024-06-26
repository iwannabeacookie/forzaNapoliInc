import userSchema from "../user-auth/models/userModel.js";

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
  console.log("Getting cart of", customer_id);
  try {
    const user = await userSchema.findOne({ _id: customer_id });
    console.info("Cart:", user.cart);
    return user.cart;
  } catch (error) {
    console.error(error);
    return false;
  }
}
