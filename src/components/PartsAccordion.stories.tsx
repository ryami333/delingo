import {
  findArtikel,
  findIntransitiveVerb,
  findNoun,
  findPronoun,
  findWechselPreposition,
} from "../helpers/testHelpers";
import { PartsAccordion } from "./PartsAccordion";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/PartsAccordion",
  component: PartsAccordion,
  args: {
    parts: [
      ["she", findPronoun("she")],
      ["runs", findIntransitiveVerb("run")],
      ["in front of", findWechselPreposition("in front of")],
      ["her", findArtikel("her")],
      ["day", findNoun("day")],
    ],
  },
} satisfies Meta<typeof PartsAccordion>;

export default meta;

export const Default = {} satisfies StoryObj<typeof meta>;
