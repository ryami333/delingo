import type { Preview } from "@storybook/react";
import React from "react";
import "../src/assets/css/main.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        "red-bull-dark": {
          name: "red-bull-dark",
          value: "#000F1ECC",
        },

        "callsessions-gradient-red": {
          name: "callsessions-gradient-red",
          value:
            "linear-gradient(308deg, rgba(0, 0, 0, 0.00) 7.11%, rgba(221, 23, 44, 0.40) 67.08%), #001C39",
        },

        "callsessions-gradient-blue": {
          name: "callsessions-gradient-blue",
          value:
            "linear-gradient(308deg, rgba(0, 0, 0, 0.00) 7.11%, rgba(116, 163, 241, 0.40) 67.08%), #0054AC;",
        },
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "callsessions-gradient-blue",
    },
  },
};

export default preview;
