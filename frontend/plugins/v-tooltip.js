import { createApp } from "vue";
import VTooltip from "v-tooltip";

export default defineNuxtPlugin((nuxtApp) => {
  const app = createApp({});
  app.use(VTooltip);
});
