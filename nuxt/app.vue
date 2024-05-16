<script setup>
// Styles
import "./src/assets/css/style.css";

//Components
import { $items } from "./src/components/cart/scripts/cart.js";
import { apiHelperPOST } from "./src/components/helpers/api.js";
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
} from "./src/assets/js/darkMode.js";

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

// Cart Setup blyat nahui
apiHelperPOST("/cart/get", {
  user_id: "663751edeb50fc9f32cfd751",
}).then((res) => {
  const { cart } = res;
  console.info("Cart:", cart);
  $items.set(cart);
});
</script>

<template>
  <ul>
    <li>
      <NuxtLink to="/example">Home</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/history">History</NuxtLink>
    </li>
    <li>
      <NuxtLink to="/support">Support</NuxtLink>
    </li>
  </ul>
</template>

<style scoped></style>
