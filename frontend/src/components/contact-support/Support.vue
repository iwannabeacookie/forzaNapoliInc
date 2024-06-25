<script setup>
import ItemList from "../order-history/ProductList.vue";
import { apiHelperPOST } from "../helpers/api.js";
import { ref } from "vue";

const phone = ref("");
const email = ref("");
const message = ref("");

function submitTicket() {
  let ticketBody = {
    phone: phone.value,
    email: email.value,
    message: message.value,
  };
  postTicket(useRuntimeConfig(), "/api/ticket", ticketBody);
  phone.value = "";
  email.value = "";
  message.value = "";
}
</script>

<template>
  <div id="app" class="container">
    <h2>Submit a Support Ticket</h2>
    <form @submit.prevent="submitTicket">
      <label for="phone">Phone Number:</label>
      <input type="text" id="phone" v-model="phone" required /><br />

      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required /><br />

      <label for="message">Describe Your Issue:</label><br />
      <textarea id="message" v-model="message" rows="6" required></textarea
      ><br />

      <input type="submit" value="Submit Ticket" />
    </form>
  </div>
</template>

<style>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: black;
}

label {
  display: block;
  margin-bottom: 5px;
  color: black;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="submit"] {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
</style>
