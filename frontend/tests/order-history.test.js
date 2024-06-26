import { apiHelper } from "../src/components/helpers/api";
import "dotenv/config";

test("Test successful order history retrieval for a valid user", async () => {
    const response = await apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, `/api/667b5b6d3617096f83f84186/history`);
    expect(Array.isArray(response.orders)).toBe(true);
});

test("Test order history retrieval for a non-existent user", async () => {
    const response = await apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, `/api/135463/history`);
    expect(response).toBe(undefined);
});

test("Test order history retrieval for a user with no order history", async () => {
    const userId = "667b11b10114b1762362c9c4";
    const response = await apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, `/api/${userId}/history`);
    expect(response.orders.length).toBe(0);
});
