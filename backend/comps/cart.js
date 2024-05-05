import { mClient } from "../mongodb/mongodb.js"
import { ObjectId } from "mongodb"

/*
 * @param newCart: [{
    "product_id": number,
 }]
 */

export async function updateCart(newCart, customer_id) {
    customer_id = new ObjectId(customer_id)
    console.info("Customer Id:", customer_id, "New Cart:", newCart)
    const usersCollection = await mClient.db("Data").collection("Users")
    usersCollection.updateOne({ _id: customer_id }, { $set: { cart: newCart } })
    return usersCollection.findOne({ _id: customer_id })
}

export async function getCart(customer_id) {
    customer_id = new ObjectId(customer_id)
    const usersCollection = await mClient.db("Data").collection("Users")
    return await usersCollection.findOne({ _id: customer_id })
}