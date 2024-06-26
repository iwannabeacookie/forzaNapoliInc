<template>
  <div class="form-wrap">
    <h1>SIGN OUT</h1>
    <p>Are you sure you want sign out?</p>
    <form @submit.prevent="userSignout">
      <button type="submit">Sign Out</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import "~/assets/css/access_form.css";
const runtime = useRuntimeConfig().public.baseApiUrl;

export default {
  methods: {
    async userSignout() {
      const sessionid = useCookie("sessionId");
      await axios
        .post(`${runtime}/signout`, {
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
