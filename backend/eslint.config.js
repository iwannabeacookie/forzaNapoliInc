import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: [".gitignore", "tests/"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "warn",
    },
  },
];
