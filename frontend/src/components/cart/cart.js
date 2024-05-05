import { atom } from "nanostores";
import { apiHelperPOST } from "./api";

export const $items = atom([]);

const {cart, ...respose} = await apiHelperPOST("/cart/get", {"user_id": "663751edeb50fc9f32cfd751"})

$items.set(cart.cart)
