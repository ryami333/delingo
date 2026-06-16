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
    "src/routeTree.gen.ts",
  ]),
  ...typescriptEslint.configs.recommended,
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
