import { PreviousAttempt } from "./PreviousAttempt";
import type { Meta, StoryObj } from "@storybook/tanstack-react";

const meta = {
  title: "Components/PreviousAttempt",
  component: PreviousAttempt,
  args: {
    received: "mein Man",
    expected: "mein Mann",
  },
} satisfies Meta<typeof PreviousAttempt>;

export default meta;

export const Default = {} satisfies StoryObj<typeof meta>;

export const CapitalizationOnly = {
  args: {
    received: "mein mann",
    expected: "mein Mann",
  },
} satisfies StoryObj<typeof meta>;
