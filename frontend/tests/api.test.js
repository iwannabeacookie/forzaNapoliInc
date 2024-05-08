import {
  apiHelperGET,
  apiHelperPOST,
  API_URL,
} from "../src/components/cart/api";
import axios from "axios";

test("Tests GET API Endpoint", async () => {
  const response = await apiHelperGET("/");
  expect(response).toBe("Hello From the other side");
});

test("Tests POST API Endpoint", async () => {
  const response = await apiHelperPOST("/");
  expect(response).toBe("Hello From the other side");
});

test("Tests /cart/get Endpoint", async () => {
  const { cart } = await apiHelperPOST("/cart/get", {
    user_id: "663751edeb50fc9f32cfd751",
  });
  const { _id } = cart;
  expect(_id).toBe("663751edeb50fc9f32cfd751");
});
