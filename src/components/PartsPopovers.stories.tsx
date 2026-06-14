import {
  findArtikel,
  findIntransitiveVerb,
  findNoun,
  findPronoun,
  findWechselPreposition,
} from "../helpers/testHelpers";
import { PartsPopovers } from "./PartsPopovers";
import type { Meta, StoryObj } from "@storybook/tanstack-react";

const meta = {
  title: "Components/PartsPopovers",
  component: PartsPopovers,
  args: {
    parts: [
      ["she", findPronoun("she")],
      ["runs", findIntransitiveVerb("run")],
      ["in front of", findWechselPreposition("in front of")],
      ["her", findArtikel("her")],
      ["day", findNoun("day")],
    ],
  },
} satisfies Meta<typeof PartsPopovers>;

export default meta;

export const Default = {} satisfies StoryObj<typeof meta>;
