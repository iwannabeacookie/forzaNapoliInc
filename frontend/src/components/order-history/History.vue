<script setup>
import { ref, onMounted } from "vue";
import ItemList from "./ProductList.vue";
import { apiHelper } from "../helpers/api.js";

const data = ref({});

onMounted(async () => {
  try {
    const sessionID = useCookie("sessionId");
    const user = await apiHelper(
      "get",
      useRuntimeConfig(),
      "/user/" + sessionID.value,
    );
    const historyData = await apiHelper(
      "get",
      useRuntimeConfig(),
      `/api/${user._id}/history`,
    );
    data.value = historyData;
  } catch (error) {
    console.error("Blyat! Error fetching history:", error);
  }
});
</script>

<template>
  <ItemList :data="data" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
