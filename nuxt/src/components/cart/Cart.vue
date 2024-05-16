<script setup>
import CartModal from "../src/components/cart/CartModal.vue";
import { $viewCart } from "../src/components/cart/scripts/cart";
import { useStore } from "@nanostores/vue";
const viewCart = useStore($viewCart);
</script>

<template>
    <div>
        <button @click="$viewCart.set(true)">Cart</button>
        <CartModal v-if="viewCart" />
    </div>
</template>
