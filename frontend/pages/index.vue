<script setup>
import axios from 'axios';

const sessionid = useCookie('sessionId');

async function user(){
    await axios.post('http://localhost:3000/user', {
        sessionid: sessionid
    }).then(response => {
        console.log(response.data);
    }).catch(error => {
        console.log(error);
    });
}
</script>

<template>
    <button onclick="window.location.href='/auth/login';">Log In</button>
    {{ sessionid }}
    <button @click="user">user</button>

  <ul>
    <li>
      <NuxtLink to="/cart">Cart</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/history">History</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/support">Support</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/catalogue">Catalogue</NuxtLink>
    </li>
  </ul>
</template>
