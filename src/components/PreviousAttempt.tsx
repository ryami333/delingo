import { getInflections } from "../helpers/getInflections";
import { AbstractProblem } from "../helpers/problems/AbstractProblem";
import { Text } from "@mantine/core";
import { diffWords } from "diff";

export function PreviousAttempt({
  problem,
  received,
}: {
  problem: Pick<AbstractProblem, "solution" | "problemParts">;
  received: string;
}) {
  const { solution: expected, problemParts } = problem;

  const diff = diffWords(received, expected, {
    intlSegmenter: new Intl.Segmenter("de-DE", { granularity: "word" }),
  });

  // Each entity's full set of inflected forms, lowercased. Two words in the
  // same set are different declensions of the same word.
  const paradigms = problemParts.map(
    ([, entity]) =>
      new Set(getInflections(entity).map((form) => form.toLowerCase())),
  );

  return (
    <Text>
      {diff.map((item, index) => {
        // Added segments belong to the expected answer, not what the user
        // typed, so we never render them on their own.
        if (item.added) return null;

        const color = (() => {
          if (!item.removed) return "green";

          // A removed segment is immediately followed by its added
          // counterpart when the word was changed.
          const next = diff[index + 1];
          if (!next?.added) return "red";

          const received = item.value.trim().toLowerCase();
          const expected = next.value.trim().toLowerCase();

          // Right word, wrong case: only the capitalization differs.
          if (received === expected) return "yellow";

          // Right word, wrong declension: both forms belong to the same
          // entity's paradigm.
          const wrongDeclension = paradigms.some(
            (forms) => forms.has(received) && forms.has(expected),
          );
          if (wrongDeclension) return "orange";

          return "red";
        })();

        return (
          <span key={index} style={{ color }}>
            {item.value}
          </span>
        );
      })}
    </Text>
  );
}
