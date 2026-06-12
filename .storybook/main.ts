import type { StorybookConfig } from "@storybook/tanstack-react";

const config: StorybookConfig = {
  stories: ["../src/**/**/*.stories.@(js|jsx|ts|tsx)"],
  core: {
    disableTelemetry: true,
  },

  addons: ["@storybook/addon-links"],

  framework: {
    name: "@storybook/tanstack-react",
    options: {},
  },

  staticDirs: ["../public"],

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
