import { atom } from "nanostores";
import { apiHelperPOST } from "./api";

export const $items = atom([]);
export const $viewCart = atom(false)

$viewCart.subscribe(viewCart => {  
    console.log(viewCart)
})

const {cart, ...respose} = await apiHelperPOST("/cart/get", {"user_id": "663751edeb50fc9f32cfd751"})

$items.set(cart.cart)

export function findItemIndexById(originalArr, id) {
    for (let i = 0; i < originalArr.length; i++) {
      if (originalArr[i].id == id) {
        return i;
      }
    }
    return -1;
  }
