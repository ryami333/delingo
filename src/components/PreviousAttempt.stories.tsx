import { PreviousAttempt } from "./PreviousAttempt";
import type { Meta, StoryObj } from "@storybook/tanstack-react";

const meta = {
  title: "Components/PreviousAttempt",
  component: PreviousAttempt,
  args: {},
} satisfies Meta<typeof PreviousAttempt>;

export default meta;

export const Default = {
  args: {
    feedback: [
      { text: "mein ", kind: "none" },
      { text: "Man", kind: "unknown" },
    ],
  },
} satisfies StoryObj<typeof meta>;

export const Capitalization = {
  args: {
    feedback: [
      { text: "mein ", kind: "none" },
      { text: "mann", kind: "capitalization" },
    ],
  },
} satisfies StoryObj<typeof meta>;

export const WrongDeclension = {
  args: {
    feedback: [
      { text: "den", kind: "declension" },
      { text: " Mensch", kind: "none" },
    ],
  },
} satisfies StoryObj<typeof meta>;
