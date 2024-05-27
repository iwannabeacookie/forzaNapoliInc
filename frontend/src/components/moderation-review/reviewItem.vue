<template>
  <div class="review-item">
    <p>{{ review.content }}</p>
    <button @click="handleDelete">Delete</button>
    <button @click="handleShadow">Shadow</button>
    <button @click="handleWarn">Warn</button>
    <button @click="handleBan">Ban</button>
  </div>
</template>

<script>
export default {
  props: ["review"],
  methods: {
    handleDelete() {
      this.$emit("delete-review", this.review._id);
    },
    handleShadow() {
      this.$emit("shadow-review", this.review._id);
    },
    handleWarn() {
      this.$emit("warn-user", this.review.userId);
    },
    handleBan() {
      this.$emit("ban-user", this.review.userId);
    },
  },
};
</script>
