import { apiHelperPOST } from "../src/components/helpers/api";

test("Test newsletter sending all newsletters out", async () => {
    const response = await apiHelperPOST("/newsletter/send-newsletters")
    expect(response).toBe(true)
})

test("Test removing a user from the newsletter", async () => {
    const response = await apiHelperPOST("/newsletter/remove-from-newsletter", { email: "ilpowtooner@gmail.com" })
    expect(response).toBe(false)
})

test("Test removing a user from the newsletter without specifing an email", async () => {
    const response = await apiHelperPOST("/newsletter/remove-from-newsletter")
    expect(response).not.toBe(false)
})


test("Test removing a user from the newsletter with a non-existing email", async () => {
    const response = await apiHelperPOST("/newsletter/remove-from-newsletter", { email: "nonexistent@email.com" })
    expect(response).not.toBe(false)
})

test("Test adding a user to the newsletter", async () => {
    const response = await apiHelperPOST("/newsletter/add-to-newsletter", { email: "ilpowtooner@gmail.com" })
    expect(response).toBe(true)
})

test("Test adding a user to the newsletter without specifing an email", async () => {
    const response = await apiHelperPOST("/newsletter/add-to-newsletter")
    expect(response).not.toBe(true)
})

test("Test adding a user to the newsletter with a non-existent email", async () => {
    const response = await apiHelperPOST("/newsletter/add-to-newsletter", { email: "nonexistent@email.com" })
    expect(response).not.toBe(true)
})