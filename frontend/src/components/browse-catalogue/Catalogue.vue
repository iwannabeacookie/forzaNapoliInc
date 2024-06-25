<template>
  <div class="catalogue">
    <section class="filter-section">
      <label for="search">Search:</label>
      <input
        id="search"
        v-model="searchTerm"
        placeholder="Search for an item"
      />

      <label for="sale">On Sale:</label>
      <select id="sale" v-model="selectedSale">
        <option value="">All</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>

      <label for="availability">Availability:</label>
      <select id="availability" v-model="selectedAvailability">
        <option value="">All</option>
        <option value="true">Available</option>
        <option value="false">Out of Stock</option>
      </select>

      <label for="price">Price:</label>
      <select id="price" v-model="selectedPrice">
        <option value="">All</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </section>
    <div v-if="filteredItems.length === 0" class="no-items">
      No items match the provided filters.
    </div>

    <Item
      v-for="(item, index) in filteredItems"
      :key="index"
      :item="item"
      v-else
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import CatalogueItem from "./CatalogueItem.vue";
import Item from "./CatalogueItem.vue";
import { apiHelperGET } from "../helpers/api.js";

const items = ref([]);
const selectedFilter = ref("");
const selectedSale = ref("");
const selectedAvailability = ref("");
const selectedPrice = ref("");
const searchTerm = ref("");

const computeSalePrice = (price, sale) => {
  return Math.ceil((price * (100 - sale)) / 100) - 0.01;
};

const applyFilter = () => {
  let filtered = items.value;
  if (selectedFilter.value) {
    filtered = filtered.filter(
      (item) => item.category === selectedFilter.value,
    );
  }
  if (selectedSale.value) {
    filtered = filtered.filter(
      (item) =>
        (item.sale && selectedSale.value === "true") ||
        (!item.sale && selectedSale.value === "false"),
    );
  }
  if (selectedAvailability.value) {
    filtered = filtered.filter(
      (item) => item.available.toString() === selectedAvailability.value,
    );
  }
  if (selectedPrice.value) {
    filtered = filtered.sort((a, b) => {
      let aPrice = a.price;
      let bPrice = b.price;
      if (a.sale) {
        aPrice = computeSalePrice(a.price, a.sale);
      }
      if (b.sale) {
        bPrice = computeSalePrice(b.price, b.sale);
      }
      return selectedPrice.value === "low" ? aPrice - bPrice : bPrice - aPrice;
    });
  }
  if (searchTerm.value) {
    filtered = filtered.filter((item) =>
      item.article.toLowerCase().includes(searchTerm.value.toLowerCase()),
    );
  }
  return filtered;
};

const filteredItems = computed(applyFilter);

watch(
  [
    selectedFilter,
    selectedSale,
    selectedAvailability,
    selectedPrice,
    searchTerm,
  ],
  applyFilter,
);

onMounted(async () => {
  items.value = await apiHelperGET(useRuntimeConfig(), "/api/catalogue", {});
});
</script>

<style scoped>
.filter-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-section label {
  font-weight: 500;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  color: #333;
}

.filter-section select,
.filter-section input {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  background-clip: padding-box;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.filter-section select:focus,
.filter-section input:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.no-items {
  padding: 20px;
  text-align: center;
  color: #6c757d;
}
</style>
