<template>
  <div class="item-page">
    <img :src="data.imageUrl" alt="Item picture" class="item-image" />
    <h1 class="item-title">{{ data.article }}</h1>
    <p class="item-description">{{ data.description }}</p>
    <p class="item-price" v-if="data.sale">
      <s>Price: {{ data.price }}</s> New Price:
      {{ Math.ceil(discountedPrice) - 0.01 }}
    </p>
    <p class="item-price" v-else>Price: {{ data.price }}</p>
    <p class="item-sale" v-if="data.sale">Sale: {{ data.sale }}%</p>
    <p class="item-availability">
      Availability: {{ data.available ? "Available" : "Out of stock" }}
    </p>
    <div class="item-review-section">
      <h2>Reviews</h2>
      <p>Review section coming soon...</p>
    </div>
  </div>
</template>

<script>
import getItem from "./scripts/getItem.js";
import { ref, toRaw } from "vue";

const route = useRoute();
console.log(route, toRaw(route).params, route.params.id, "blyat", route.name);

onBeforeMount(async () => {
  const data = await useAsyncData(() =>
    getItem(route.params.id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
      }),
  );

  const discountedPrice = computed(
    () => (data.price * (100 - data.sale)) / 100,
  );
});
</script>

<style scoped>
.item-page {
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.item-image {
  width: 15%;
  height: auto;
}

.item-title {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.item-description {
  font-size: 18px;
  color: #666;
}

.item-price {
  font-size: 20px;
  color: #333;
  margin: 10px 0;
}

.item-sale {
  color: red;
  font-weight: bold;
}

.item-availability {
  font-size: 18px;
  color: #333;
}

.item-review-section {
  margin-top: 20px;
}
</style>
