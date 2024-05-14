<script setup>
// Styles
import "./src/assets/css/style.css";

//Components
import ExampleDarkModePlatform from "./src/components/ExampleDarkModePlatform.vue";
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
  </div>
</template>

<style scoped></style>
