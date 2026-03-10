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

  return JSON.stringify(diff, null, 2);
}
