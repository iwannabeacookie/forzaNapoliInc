<template>
  <div class="item-page">
    <img :src="data.imageUrl" alt="Item picture" class="item-image" />
    <h1 class="item-title">{{ data.article }}</h1>
    <p class="item-description">{{ data.description }}</p>
    <p class="item-price" v-if="data.sale">
      <s>Price: {{ data.price }}</s> New Price:
      {{ Math.ceil(discountedPrice()) - 0.01 }}
    </p>
    <p class="item-price" v-else>Price: {{ data.price }}</p>
    <p class="item-sale" v-if="data.sale">Sale: {{ data.sale }}%</p>
    <p class="item-availability">
      Availability: {{ data.available ? "Available" : "Out of stock" }}
    </p>
    <div class="item-review-section">
      <h2>Reviews</h2>
      <div>
        <div v-for="review in data.reviews" class="review">
          <div class="nameReview">
            <p>{{ review.userName }} {{ review.userSurname }}</p>
            <p v-if="review.certified" class="reviewCertifiedMark">✅︎</p>
          </div>
          <div class="textReview">
            <p>{{ review.text }}</p>
          </div>
        </div>
      </div>

      <form class="sendReviews" @submit="sendReviews">
        <input class="textFormReview" type="textarea" v-model="comment" required placeholder="Write your review" />
        <input class="submitReview" type="submit" value="➤" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { apiHelperGET, apiHelperPOST } from "../helpers/api.js";
import { ref, onMounted } from "vue";
const sessionid = useCookie("sessionId");

const route = useRoute();
const data = ref({});
const comment = ref("");

onMounted(async () => {
  data.value = await apiHelperGET(
    useRuntimeConfig(),
    "/api/item/" + route.params.id,
    {},
  );
});
const discountedPrice = () => {
  return (data.value.price * (100 - data.value.sale)) / 100;
};
async function sendReviews() {
  await apiHelperPOST(useRuntimeConfig(), "/review", {
    sessionid: sessionid,
    itemid: route.params.id,
    comment: comment.value,
  });
}
onMounted(async () => {
  sendReviews();
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

.nameReview {
  display: flex;
  padding: auto;
  margin-bottom: 10px;
  font-size: 18px;
}

.textReview {
  padding: auto;
  font-size: 14px;
}

.review {
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  background-color: #bff6ff;
}

.reviewCertifiedMark {
  margin-left: 5px;
  color: blue;
}

.sendReviews {
  display: flex;
  width: 100%;
}

.textFormReview {
  padding: 20px;
  margin-right: 10px;
  background-color: #bff6ff;
}

.submitReview {
  padding: 20px;
  padding-left: 25px;
  width: auto;
  font-size: larger;
  background-color: #74edff;
}
</style>
