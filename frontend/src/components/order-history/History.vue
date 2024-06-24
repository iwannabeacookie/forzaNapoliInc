<script setup>
import { ref, onMounted } from "vue";
import ItemList from "./ProductList.vue";
import getHistory from "./scripts/getHistory.js";

const data = ref({});

onMounted(async () => {
  try {
    const historyData = await getHistory({ _id: "663c962b66b3219a1852a91e" });
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
