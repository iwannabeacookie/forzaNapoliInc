import { apiHelper } from "../src/components/helpers/api";
import "dotenv/config"

test("Test grabbing the cart of a user", async () => {
    apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, `/cart/get/6678bd6670c4ca894ea44ddc`).then(
        (res) => {
            const { cart } = res;
            expect(Array.isArray(cart)).toBe(true)
        },
    );
})

test("Test grabbing the cart of a non-existing user", async () => {
    apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, `/cart/get/undefined`).then(
        (res) => {
            expect(res).toBe(undefined)
        },
    );
})

test("Test updating the cart of a user", async () => {
    const userId = "6678bd6670c4ca894ea44ddc"
    const { updated_cart } = await apiHelper("put", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, "/cart/update", {
        "new_cart": [],
        "user_id": userId
    })
    expect(typeof updated_cart).toBe("object")
})

test("Test updating the cart of a non-existing user", async () => {
    const userId = "nonexistent"
    const response = await apiHelper("put", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, "/cart/update", {
        "new_cart": [],
        "user_id": userId
    })
    console.warn(response)
    expect(response).toBe(undefined)


})