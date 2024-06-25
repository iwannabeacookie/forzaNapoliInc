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