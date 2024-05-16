<template>
  <div>
    <Cart />
  </div>
</template>

<script>
import Cart from "../src/components/cart/Cart.vue";
import { apiHelperPOST } from "~/src/components/helpers/api";
import { $items } from "~/src/components/cart/scripts/cart";

apiHelperPOST("/cart/get", {
  user_id: "663751edeb50fc9f32cfd751",
}).then((res) => {
  const { cart } = res;
  console.info("Cart:", cart);
  $items.set(cart);
});

export default {
  components: {
    Cart,
  },
};
</script>
