import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: [
      "js/recommended",
      ...tseslint.configs.recommended,
      "plugin:prettier/recommended",
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  prettier,
]);
