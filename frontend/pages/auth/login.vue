<template>
  <div class="form-wrap">
    <h1>LOG IN</h1>
    <p v-if="message">{{ message }}</p>
    <form @submit.prevent="userLogin">
      <input
        type="text"
        v-model="username"
        id="username"
        required
        autocomplete="off"
        placeholder="E-mail"
      />
      <input
        type="password"
        v-model="password"
        id="pass"
        required
        placeholder="password"
      />
      <button type="submit">Login</button>
    </form>
    <button
      class="login-with-google-btn"
      onclick="window.location.href='http://localhost:3000/login/google';"
    >
      Log in with Google
    </button>
    <p>Don't have an account? <a href="/auth/signup">Signup</a></p>
  </div>
</template>

<script>
import "~/assets/css/access_form.css";
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async userLogin() {
      const sessionid = useCookie("sessionId");
      await axios
        .post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          this.message = "";
          sessionid.value = response.data;
          navigateTo("/");
        })
        .catch((error) => {
          this.message = "Incorrect user or password";
        });
    },
  },
};
</script>
