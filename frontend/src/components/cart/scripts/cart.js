import { atom } from "nanostores";
import { apiHelper } from "../../helpers/api";

export const $userId = atom("");
export const $items = atom([]);
export const $viewCart = atom(false);

$viewCart.subscribe((viewCart) => {
  console.log(viewCart);
});

export async function addItemToCart(item) {
  const items = $items.get();
  if (findItemIndexById([...$items.get()], item._id) === -1) {
    items.push(item);
    updateCart(items);
  }
}

export async function updateCart(new_cart) {
  const { updated_cart } = await apiHelper(
    "put",
    useRuntimeConfig(),
    "/cart/update",
    {
      new_cart: new_cart,
      user_id: $userId.get(),
    },
  ).then((res) => res);
  console.info("New Cart:", updated_cart.cart);
  $items.set(updated_cart.cart);
}

export function findItemIndexById(originalArr, id) {
  // console.warn(`Original: ${originalArr[0]._id} id: ${id}`)
  for (let i = 0; i < originalArr.length; i++) {
    if (originalArr[i]._id === id) {
      return i;
    }
  }
  return -1;
}
