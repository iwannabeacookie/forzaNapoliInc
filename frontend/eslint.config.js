import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt([
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    ignores: [".gitignore", "tests/"],
    rules: {
      "vue/multi-word-component-names": "warn",
      "no-unused-vars": "warn",
    },
  },
]);
