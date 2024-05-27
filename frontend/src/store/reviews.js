import axios from "axios";

export const state = () => ({
  reviews: [],
});

export const mutations = {
  SET_REVIEWS(state, reviews) {
    state.reviews = reviews;
  },
  REMOVE_REVIEW(state, reviewId) {
    state.reviews = state.reviews.filter((review) => review._id !== reviewId);
  },
};

export const actions = {
  async fetchReviews({ commit }) {
    const response = await axios.get("/api/reviews");
    commit("SET_REVIEWS", response.data);
  },
  async deleteReview({ commit }, reviewId) {
    await axios.delete(`/api/reviews/${reviewId}`);
    commit("REMOVE_REVIEW", reviewId);
  },
};

export const getters = {
  allReviews: (state) => state.reviews,
};
