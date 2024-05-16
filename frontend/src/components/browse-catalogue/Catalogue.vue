<template>
  <div class="catalogue">
    <CatalogueItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script>
import CatalogueItem from "./CatalogueItem.vue";
import getCatalogue from "./scripts/getCatalogue.js";

export default {
  name: "Catalogue",
  data() {
    return {
      items: [],
    };
  },
  components: {
    CatalogueItem,
  },
  async created() {
    getCatalogue()
      .then((items) => {
        console.log(items);
        this.items = items;
      })
      .catch((error) => {
        console.log("Blyat! Error fetching history:", error);
      });
  },
};
</script>
