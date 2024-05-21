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
      <div v-if="data.reviews[0]">
        <div v-for="review in data.reviews">
          <p>{{ review.userName }} {{ review.userSurname }}</p>
          <p v-if="review.certified">certified</p>
          <p>{{ review.text }}</p>
        </div>
      </div>
      <p v-else>no reviews</p>

      <form id="sendReviews" @submit="sendReviews">
        <input
          type="textarea"
          v-model="comment"
          required
          placeholder="Write your review"
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getItem from "./scripts/getItem.js";

export default defineNuxtComponent({
  name: "Item",
  data() {
    return {
      data: {},
      comment: "",
    };
  },
  computed: {
    discountedPrice() {
      return (this.data.price * (100 - this.data.sale)) / 100;
    },
  },
  async asyncData() {
    const route = useRoute();
    let data = {};
    await getItem(route.params.id)
      .then((doc) => {
        data = doc;
      })
      .catch((error) => {
        console.log("Blyat! Error fetching item:", error);
      });
    console.log(data);
    return { data: data };
  },
  methods: {
    async sendReviews() {
      const route = useRoute();
      const sessionid = useCookie("sessionId");
      await axios
        .post("http://localhost:3000/post/review", {
          sessionid: sessionid,
          itemid: route.params.id,
          comment: this.comment,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
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
