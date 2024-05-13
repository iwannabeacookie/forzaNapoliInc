<script setup>
import ExampleDarkModePlatform from "./components/ExampleDarkModePlatform.vue";
import Cart from "./components/Cart.vue";
</script>

<script>
import {
  showMenu,
  hideMenu,
  removeMenuMobile,
  setupAccordionSkills,
  setupQualificationTabs,
  setupServicesModal,
  setupPortfolioSwiper,
  setupTestimonialSwiper,
  setupScrollSectionsActiveLink,
  setupScrollHeader,
  setupShowScrollTop,
  setupDarkLightTheme,
} from "./assets/js/darkMode.js";

export default {
  mounted() {
    showMenu();
    hideMenu();
    removeMenuMobile();
    setupAccordionSkills();
    setupQualificationTabs();
    setupServicesModal();
    setupPortfolioSwiper();
    setupTestimonialSwiper();
    setupScrollSectionsActiveLink();
    setupScrollHeader();
    setupShowScrollTop();
    setupDarkLightTheme();
  },
};
</script>

<style scoped>
.Cart {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 100px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<template>
  <div>
    <ExampleDarkModePlatform />
    <Cart />
  </div>
</template>

<style scoped></style>
