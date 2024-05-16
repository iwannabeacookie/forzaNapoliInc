<script setup>
const sessionid = useCookie('sessionId');
</script>

<template>
    <button onclick="window.location.href='/auth/login';">Log In</button>
    {{ sessionid }}
</template>