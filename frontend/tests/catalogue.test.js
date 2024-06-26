import { apiHelper } from "../src/components/helpers/api";
import "dotenv/config";

test("Test getting all catalogue items", async () => {
    const response = await apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, "/api/catalogue");
    expect(Array.isArray(response)).toBe(true);
});

test("Test getting a specific catalogue item by id", async () => {
    const response = await apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, "/api/item/664624b529c4e725b30541a8");
    expect(response.article).toBe('Vodka');
});

test("Test getting a non-existing catalogue item by id", async () => {
    const itemId = "5315890643";
    const response = await apiHelper("get", { public: { baseApiUrl: process.env.NUXT_BASE_API_URL } }, `/api/item/${itemId}`);
    expect(response).toBe(undefined);
});
