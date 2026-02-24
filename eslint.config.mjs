// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import tsParser from "@typescript-eslint/parser";
import storybook from "eslint-plugin-storybook";
import { globalIgnores } from "eslint/config";

const eslintConfig = [
  globalIgnores([
    "node_modules/**",
    ".next/**",
    ".output/**",
    "out/**",
    "build/**",
    "storybook-static/**",
    "src/__generated__/**",
  ]),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message: 'Please use "src/helpers/env.mjs#env" instead.',
        },
      ],
    },
  },
];

export default eslintConfig;
