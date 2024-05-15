<template>
  <div class="form-wrap">
    <h1>SIGN UP</h1>
    <p v-if="message">{{ message }}</p>
    <form @submit.prevent="userSignup">
      <input type="text" v-model="name" id="name" required autocomplete="off" placeholder="Name">
      <input type="text" v-model="surname" id="surname" required autocomplete="off" placeholder="Surname">
      <input type="text" v-model="email" id="email" required autocomplete="off" placeholder="E-mail">
      <input type="password" v-model="password" id="pass" required placeholder="Password">
      <button type="submit">Sign Up</button>
      <p>Already have an account? <a href="/auth/login">Login</a></p>
    </form>
  </div>
</template>

<script>

import '~/assets/css/access_form.css'

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async userSignup() {
      const sessionid = useCookie('sessionId');
      await useFetch('http://localhost:3000/signup', {
        method: 'post',
        body: {
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password
        }
      }).then((response) => {
        if (response.error.value) {
          console.log(response.error);
          this.message = "already used email"
        } else {
          sessionid.value = response.data.value;
          navigateTo('/');
        }
      });
    }
  }
}
</script>