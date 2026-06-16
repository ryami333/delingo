import { CheatSheet } from "./CheatSheet";
import type { Meta, StoryObj } from "@storybook/tanstack-react";

const meta = {
  title: "Components/CheatSheet",
  component: CheatSheet,
  args: {},
} satisfies Meta<typeof CheatSheet>;

export default meta;

export const Default = { args: {} } satisfies StoryObj<typeof meta>;
