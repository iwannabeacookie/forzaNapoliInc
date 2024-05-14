import { atom } from "nanostores";

export const $items = atom([]);
export const $viewCart = atom(false);

$viewCart.subscribe((viewCart) => {
  console.log(viewCart);
});

export function findItemIndexById(originalArr, id) {
  for (let i = 0; i < originalArr.length; i++) {
    if (originalArr[i].id == id) {
      return i;
    }
  }
  return -1;
}
