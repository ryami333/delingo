// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import { globalIgnores } from "eslint/config";
import typescriptEslint from "typescript-eslint";

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
  ...typescriptEslint.configs.recommended,
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
