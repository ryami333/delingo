import { getInflections } from "./getInflections";
import { AbstractProblem } from "./problems/AbstractProblem";
import { diffWords } from "diff";

export type FeedbackKind =
  | "none"
  | "capitalization"
  | "declination"
  | "unknown";

/**
 * A single segment of the user's attempt, paired with the kind of problem (if
 * any) it represents. `text` is the portion of the received answer; `problem`
 * classifies how it differs from the expected solution.
 */
export type Feedback = {
  text: string;
  kind: FeedbackKind;
};

/**
 * Diffs a received answer against the expected solution and classifies each
 * surviving segment of the received answer. The returned array preserves the
 * order of the received answer and omits segments that only exist in the
 * expected answer.
 */
export function getAttemptFeedback({
  problem,
  received,
}: {
  problem: Pick<AbstractProblem, "solution" | "problemParts">;
  received: string;
}): Feedback[] {
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

  const feedback: Feedback[] = [];

  diff.forEach((item, index) => {
    // Added segments belong to the expected answer, not what the user typed,
    // so we never surface them on their own.
    if (item.added) return;

    const problemKind = ((): FeedbackKind => {
      if (!item.removed) return "none";

      // A removed segment is immediately followed by its added counterpart
      // when the word was changed.
      const next = diff[index + 1];
      if (!next?.added) return "unknown";

      const receivedForm = item.value.trim().toLowerCase();
      const expectedForm = next.value.trim().toLowerCase();

      // Right word, wrong case: only the capitalization differs.
      if (receivedForm === expectedForm) return "capitalization";

      // Right word, wrong declension. Identify this slot's paradigm by the
      // expected (correct) form, then check whether the received form is a
      // different inflection within it. Pinning to the paradigm that owns the
      // expected form — rather than any paradigm in the solution — keeps the
      // feedback positionally meaningful.
      const slotParadigm = paradigms.find((forms) => forms.has(expectedForm));
      if (slotParadigm?.has(receivedForm)) return "declination";

      return "unknown";
    })();

    feedback.push({ text: item.value, kind: problemKind });
  });

  return feedback;
}
