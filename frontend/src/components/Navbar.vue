<template>
    <nav>
        <button v-tooltip="'Log in if you already have an account'" v-if="!sessionid"
            @click="changePage('/auth/login')">
            Log In
        </button>
        <button v-tooltip="'Log out'" v-if="sessionid" @click="changePage('/auth/logout')">
            Log Out
        </button>
        {{ sessionId }}
        <button v-if="sessionid" @click="user">user</button>

        <NuxtLink to="/support"><button>Support</button></NuxtLink>
        <NuxtLink v-if="sessionid" to="/history"><button>History</button></NuxtLink>
        <NuxtLink v-if="sessionid" to="/profile/modify"><button>Modify Profile</button></NuxtLink>
        <Cart v-if="sessionid" />
    </nav>
</template>

<script setup>
import Cart from "./cart/Cart.vue";
import { apiHelper } from "~/src/components/helpers/api";
import { $items, $userId } from "~/src/components/cart/scripts/cart";

// Login codes
const sessionid = useCookie("sessionId");

function changePage(uri) {
    window.location.href = uri
}

async function user() {
    const user = await apiHelper(
        "get",
        useRuntimeConfig(),
        `/user/${sessionid.value}`,
    );
    console.log(user._id);
    $userId.set(user._id);
    return user._id;
}

// Cart setup
if (sessionid.value) {
    apiHelper("get", useRuntimeConfig(), `/cart/get/${await user()}`).then(
        (res) => {
            const { cart } = res;
            console.info("Cart:", cart);
            $items.set(cart);
        },
    );
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
