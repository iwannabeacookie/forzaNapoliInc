<template>
    <nav>
        <button v-tooltip="'Log in if you already have an account'" onclick="window.location.href='/auth/login';">
            Log In
        </button>
        {{ sessionId }}
        <button @click="user">user</button>

        <NuxtLink to="/support"><button>Support</button></NuxtLink>
        <NuxtLink to="/history"><button>History</button></NuxtLink>
        <NuxtLink to="/profile/modify"><button>Modify Profile</button></NuxtLink>
        <Cart />
    </nav>
</template>

<script setup>
import Cart from "./cart/Cart.vue";
import { apiHelper } from "~/src/components/helpers/api";
import { $items, $userId } from "~/src/components/cart/scripts/cart";

// Login codes
const sessionid = useCookie("sessionId");

async function user() {
    const user = await apiHelper("get", useRuntimeConfig(), `/user/${sessionid.value}`);
    console.log(user._id);
    $userId.set(user._id);
    return user._id;
}

// Cart setup
apiHelper("get", useRuntimeConfig(), `/cart/get/${await user()}`).then(
    (res) => {
        const { cart } = res;
        console.info("Cart:", cart);
        $items.set(cart);
    },
);
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
