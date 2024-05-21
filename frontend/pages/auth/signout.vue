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

export default {
  methods: {
    async userSignout() {
      const sessionid = useCookie("sessionId");
      await axios
        .post("http://localhost:3000/signout", {
          sessionid: sessionid,
        })
        .then((response) => {
          sessionid.value = null;
          navigateTo("/");
        });
    },
  },
};
</script>
