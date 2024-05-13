import { createApp } from "vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Components
import AppCart from "./AppCart.vue";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(AppCart).use(vuetify).mount("#app");
