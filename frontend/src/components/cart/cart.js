import { atom } from "nanostores";
import { apiHelper } from "./api";

export const $items = atom([
  {
    id: "aBelO",
    quantity: 2,
    itemName: "Uanm",
    price: 233,
    imageUrl:
      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
    available: true,
  },
  {
    id: "UaNmOzz",
    quantity: 3,
    itemName: "Comm",
    price: 232,
    imageUrl:
      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
    available: false,
  },
  {
    id: "TesTuNg",
    quantity: 2,
    itemName: "Va",
    price: 233,
    imageUrl:
      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
    available: true,
  },
]);

export default async function updateCart(new_cart) {
  return(await apiHelper("/cart/update", {"new_cart": new_cart, "user_id": 44})).json()
}