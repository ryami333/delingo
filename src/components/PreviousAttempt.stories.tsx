import { artikelSchema, artikels } from "../helpers/artikelSchema";
import { getAttemptFeedback } from "../helpers/getAttemptFeedback";
import { nounSchema, nouns } from "../helpers/nounSchema";
import { PreviousAttempt } from "./PreviousAttempt";
import type { Meta, StoryObj } from "@storybook/tanstack-react";

const theArtikel = artikelSchema.parse(
  artikels.find((a) => a.english === "the"),
);
const person = nounSchema.parse(nouns.find((n) => n.english === "person"));

const meta = {
  title: "Components/PreviousAttempt",
  component: PreviousAttempt,
  args: {
    feedback: getAttemptFeedback({
      received: "mein Man",
      problem: { solution: "mein Mann", problemParts: [] },
    }),
  },
} satisfies Meta<typeof PreviousAttempt>;

export default meta;

export const Default = {} satisfies StoryObj<typeof meta>;

export const CapitalizationOnly = {
  args: {
    feedback: getAttemptFeedback({
      received: "mein mann",
      problem: { solution: "mein Mann", problemParts: [] },
    }),
  },
} satisfies StoryObj<typeof meta>;

// "den" is the accusative form of "der" — right article, wrong case.
export const WrongDeclension = {
  args: {
    feedback: getAttemptFeedback({
      received: "den Mensch",
      problem: {
        solution: "der Mensch",
        problemParts: [
          ["the", theArtikel],
          ["person", person],
        ],
      },
    }),
  },
} satisfies StoryObj<typeof meta>;
