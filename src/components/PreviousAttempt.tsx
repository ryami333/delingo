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
      {diff
        .filter((item) => !item.added)
        .map((item, index) => (
          <span key={index} style={{ color: item.removed ? "red" : "green" }}>
            {item.value}
          </span>
        ))}
    </Text>
  );
}
