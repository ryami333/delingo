import { getAttemptFeedback } from "./getAttemptFeedback";
import { findArtikel, findNoun } from "./testHelpers";
import { describe, expect, test } from "vitest";

describe("getAttemptFeedback", () => {
  test("reconstructs the received answer from its segments", () => {
    const feedback = getAttemptFeedback({
      received: "den Mensch",
      problem: { solution: "der Mensch", problemParts: [] },
    });

    expect(feedback.map((item) => item.text).join("")).toBe("den Mensch");
  });

  describe("correct answers", () => {
    test("an exact match is entirely problem-free", () => {
      const feedback = getAttemptFeedback({
        received: "mein Mann",
        problem: { solution: "mein Mann", problemParts: [] },
      });

      expect(feedback).toEqual([{ text: "mein Mann", kind: "none" }]);
    });
  });

  describe("capitalization", () => {
    test("right word, wrong case is flagged as capitalization", () => {
      const feedback = getAttemptFeedback({
        received: "mein mann",
        problem: { solution: "mein Mann", problemParts: [] },
      });

      const mann = feedback.find(
        (item) => item.text.trim().toLowerCase() === "mann",
      );
      expect(mann?.kind).toBe("capitalization");
    });
  });

  describe("inflection", () => {
    // "den" is the accusative form of "der" — right article, wrong case.
    test("a different inflection of the right word is flagged as inflection", () => {
      const feedback = getAttemptFeedback({
        received: "den Mensch",
        problem: {
          solution: "der Mensch",
          problemParts: [
            ["the", findArtikel("the")],
            ["person", findNoun("person")],
          ],
        },
      });

      const article = feedback.find(
        (item) => item.text.trim().toLowerCase() === "den",
      );
      expect(article?.kind).toBe("inflection");
    });

    test("the matched word in the answer carries no problem", () => {
      const feedback = getAttemptFeedback({
        received: "den Mensch",
        problem: {
          solution: "der Mensch",
          problemParts: [
            ["the", findArtikel("the")],
            ["person", findNoun("person")],
          ],
        },
      });

      const noun = feedback.find(
        (item) => item.text.trim().toLowerCase() === "mensch",
      );
      expect(noun?.kind).toBe("none");
    });

    test("an inflection not belonging to the expected slot's paradigm is unknown", () => {
      // "den" is a form of the article paradigm, but here it lands opposite the
      // noun "Mensch" rather than opposite the article, so it does not match
      // the slot that owns the expected form.
      const feedback = getAttemptFeedback({
        received: "der den",
        problem: {
          solution: "der Mensch",
          problemParts: [
            ["the", findArtikel("the")],
            ["person", findNoun("person")],
          ],
        },
      });

      const wrong = feedback.find(
        (item) => item.text.trim().toLowerCase() === "den",
      );
      expect(wrong?.kind).toBe("unknown");
    });
  });

  describe("unknown", () => {
    test("a substituted word with no paradigm match is unknown", () => {
      const feedback = getAttemptFeedback({
        received: "xyz Mensch",
        problem: {
          solution: "der Mensch",
          problemParts: [
            ["the", findArtikel("the")],
            ["person", findNoun("person")],
          ],
        },
      });

      const wrong = feedback.find(
        (item) => item.text.trim().toLowerCase() === "xyz",
      );
      expect(wrong?.kind).toBe("unknown");
    });

    test("an extra word with no expected counterpart is unknown", () => {
      const feedback = getAttemptFeedback({
        received: "der extra Mensch",
        problem: {
          solution: "der Mensch",
          problemParts: [
            ["the", findArtikel("the")],
            ["person", findNoun("person")],
          ],
        },
      });

      const extra = feedback.find(
        (item) => item.text.trim().toLowerCase() === "extra",
      );
      expect(extra?.kind).toBe("unknown");
    });

    test("a misspelling cannot be classified without a paradigm, so it is unknown", () => {
      const feedback = getAttemptFeedback({
        received: "mein Man",
        problem: { solution: "mein Mann", problemParts: [] },
      });

      const misspelled = feedback.find(
        (item) => item.text.trim().toLowerCase() === "man",
      );
      expect(misspelled?.kind).toBe("unknown");
    });
  });

  describe("segments belonging only to the expected answer", () => {
    test("omits added-only segments from the feedback", () => {
      // The received answer is a prefix of the solution: "Mensch" exists only
      // in the expected answer and must not surface on its own.
      const feedback = getAttemptFeedback({
        received: "der",
        problem: { solution: "der Mensch", problemParts: [] },
      });

      expect(feedback.map((item) => item.text.trim())).not.toContain("Mensch");
    });
  });
});
