<template>
    <nav>
        <button v-tooltip="'Log in if you already have an account'" onclick="window.location.href='/auth/login';">
            Log In
        </button>
        {{ sessionid }}
        <button @click="user">user</button>

        <NuxtLink to="/support"><button>Support</button></NuxtLink>
        <NuxtLink to="/history"><button>History</button></NuxtLink>
        <Cart />
    </nav>
</template>

<script setup>
import axios from "axios";
import Cart from "./cart/Cart.vue";
import { apiHelperPOST } from "~/src/components/helpers/api";
import { $items } from "~/src/components/cart/scripts/cart";

// Cart setup
apiHelperPOST("/cart/get", {
    user_id: "663751edeb50fc9f32cfd751",
}).then((res) => {
    const { cart } = res;
    console.info("Cart:", cart);
    $items.set(cart);
});

// Login code
const sessionid = useCookie("sessionId");

async function user() {
    await axios
        .post("http://localhost:3000/user", {
            sessionid: sessionid,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<style scoped>
nav {
    display: flex;
    flex-direction: row;
    float: right;
    gap: 20px;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    width: 50px;
}
</style>
