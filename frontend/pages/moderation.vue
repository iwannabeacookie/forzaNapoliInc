<template>
  <div>
    <h1>Moderation Panel</h1>
    <ReviewItem
      v-for="review in reviews"
      :key="review._id"
      :review="review"
      @delete-review="deleteReview"
      @shadow-review="shadowReview"
      @warn-user="warnUser"
      @ban-user="banUser"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ReviewItem from "~/src/components/moderation-review/ReviewItem.vue";

export default {
  components: {
    ReviewItem,
  },
  computed: {
    ...mapGetters(["allReviews"]),
  },
  methods: {
    ...mapActions([
      "fetchReviews",
      "deleteReview",
      "shadowReview",
      "warnUser",
      "banUser",
    ]),
  },
  async fetch() {
    await this.fetchReviews();
  },
};
</script>
