import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/**/*.stories.@(js|jsx|ts|tsx)"],
  core: {
    disableTelemetry: true,
  },

  addons: ["@storybook/addon-links"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  staticDirs: ["../public"],

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
