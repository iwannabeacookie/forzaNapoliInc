// https://nuxt.com/docs/api/configuration/nuxt-config
/** @type {import('vite').UserConfig} */
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
    },
  },
  ssr: false,
  modules: ["vuetify-nuxt-module", "@nuxt/eslint"],
  plugins: [{ src: "~/plugins/v-tooltip", mode: "client" }],
  devServer: {
    port: 5173,
  },
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_BASE_API_URL || "http://localhost:3000",
    },
  },
});
