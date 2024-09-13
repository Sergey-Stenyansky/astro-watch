import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "unused-disable-directive": "off",
      "eol-last": ["error", "always"],
      "import/no-unresolved": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    settings: {
      "import/resolver": {
        "eslint-import-resolver-custom-alias": {
          alias: {
            "@": "./src",
          },
          extensions: [".ts", ".js", ".tsx", ".jsx"],
        },
      },
    },
  },
);
