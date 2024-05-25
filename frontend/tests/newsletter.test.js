import { apiHelperPOST } from "../src/components/helpers/api";

test("Test newsletter sending all newsletters out", async () => {
    const response = await apiHelperPOST("/newsletter/send-newsletter")
    expect(response).toBe(null)
})

test("Test removing a user from the newsletter", async () => {
    const response = await apiHelperPOST("/newsletter/remove-from-newsletter", { email: "ilpowtooner@gmail.com" })
    expect(response).toBe(false)
})

test("Test adding a user to the newsletter", async () => {
    const response = await apiHelperPOST("/newsletter/add-to-newsletter", { email: "ilpowtooner@gmail.com" })
    expect(response).toBe(true)
})