<template>
  <div class="catalogue">
    <Item v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CatalogueItem from "./CatalogueItem.vue";
import Item from "./CatalogueItem.vue";
import getCatalogue from "./scripts/getCatalogue.js";

const items = ref([]);

onMounted(async () => {
  items.value = await getCatalogue();
});
</script>
