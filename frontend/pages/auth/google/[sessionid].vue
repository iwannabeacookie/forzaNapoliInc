<script setup>
const route = useRoute();

const sessionid = useCookie("sessionId");
sessionid.value = route.params.sessionid;
navigateTo("/");
</script>

<template></template>
