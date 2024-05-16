<script setup>
import { $items } from "./components/cart/scripts/cart.js";
import { apiHelperPOST } from "./components/helpers/api.js";
import ExampleDarkModePlatform from "./views/ExampleDarkModePlatform.vue";
import SupportView from "./views/SupportView.vue";
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

// Cart Setup blyat nahui
const { cart } = await apiHelperPOST("/cart/get", {
  user_id: "663751edeb50fc9f32cfd751",
});

$items.set(cart);
</script>

<template>
  <div>
    <SupportView />
  </div>
</template>
