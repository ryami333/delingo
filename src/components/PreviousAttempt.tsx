import { Text } from "@mantine/core";
import { diffWords } from "diff";

export function PreviousAttempt({
  expected,
  received,
}: {
  expected: string;
  received: string;
}) {
  const diff = diffWords(received, expected, {
    intlSegmenter: new Intl.Segmenter("de-DE", { granularity: "word" }),
  });

  return (
    <Text>
      {diff.map((item, index) => {
        // Added segments belong to the expected answer, not what the user
        // typed, so we never render them on their own.
        if (item.added) return null;

        const color = (() => {
          if (!item.removed) return "green";

          // A removed segment is immediately followed by its added
          // counterpart when the word was changed. If they match
          // case-insensitively, the only mistake was capitalization.
          const next = diff[index + 1];
          const capitalizationOnly =
            next?.added &&
            next.value.toLowerCase() === item.value.toLowerCase();
          return capitalizationOnly ? "yellow" : "red";
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
