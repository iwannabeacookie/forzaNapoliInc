<template>
    <nav>
        <button v-tooltip="'Log in if you already have an account'" onclick="window.location.href='/auth/login';">
            Log In
        </button>
        {{ sessionId }}
        <button @click="user">user</button>

        <NuxtLink to="/support"><button>Support</button></NuxtLink>
        <NuxtLink to="/history"><button>History</button></NuxtLink>
        <Cart />
    </nav>
</template>

<script setup>
import axios from "axios";
import Cart from "./cart/Cart.vue";
import { apiHelper } from "~/src/components/helpers/api";
import { $items } from "~/src/components/cart/scripts/cart";

// Login code
const sessionId = useCookie("sessionId");

// Cart setup
apiHelper("get", useRuntimeConfig(), `/cart/get/`)
    .then((res) => {
        const { cart } = res;
        console.info("[ Cart ] Cart:", cart);
        $items.set(cart);
    })
    .catch((res) => {
        console.error("[ Cart ] Failed to fetch cart");
    });

async function user() {
    await axios
        .post("http://localhost:3000/user", {
            sessionId: sessionId,
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
    width: 75px;
}
</style>
