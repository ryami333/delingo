import { RootComponent } from "../src/routes/__root";
import type { Preview } from "@storybook/react";
import "../src/assets/css/main.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <RootComponent>
        <Story />
      </RootComponent>
    ),
  ],
};

export default preview;
