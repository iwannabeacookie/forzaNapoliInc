<template>
  <div class="form-wrap">
    <h1>LOG OUT</h1>
    <p>Are you sure you want log out?</p>
    <form @submit.prevent="userLogout">
      <button type="submit">Logout</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import "~/assets/css/access_form.css";
const runtime = useRuntimeConfig().public.baseApiUrl;

export default {
  methods: {
    async userLogout() {
      const sessionid = useCookie("sessionId");
      await axios
        .post(`${runtime}/logout`, {
          sessionid: sessionid.value,
        })
        .then((response) => {
          sessionid.value = null;
          navigateTo("/");
        });
    },
  },
};
</script>
