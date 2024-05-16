import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
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
      "vue/no-unused-components": "warn",
    },
  },
];
