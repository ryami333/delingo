import { PreviousAttempt } from "./PreviousAttempt";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/PreviousAttempt",
  component: PreviousAttempt,
  args: {
    received: "mein Mann",
    expected: "mein Man",
  },
} satisfies Meta<typeof PreviousAttempt>;

export default meta;

export const Default = {} satisfies StoryObj<typeof meta>;
