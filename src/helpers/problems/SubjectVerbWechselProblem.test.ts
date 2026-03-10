import {
  findArtikel,
  findIntransitiveVerb,
  findNoun,
  findPronoun,
  findWechselPreposition,
} from "../testHelpers";
import { SubjectVerbWechselProblem } from "./SubjectVerbWechselProblem";
import { describe, expect, test } from "vitest";

describe("SubjectVerbWechselProblem", () => {
  describe("directional verb takes akkusativ — article inflection by gender", () => {
    test("masculine article in akkusativ: Er geht hinter den Mann", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("behind"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er geht hinter den Mann");
    });

    test("feminine article in akkusativ: Er geht hinter die Frau", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("behind"),
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er geht hinter die Frau");
    });

    test("neuter article in akkusativ: Er geht in das Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er geht in das Haus");
    });
  });

  describe("locative verb takes dativ — article inflection by gender", () => {
    test("masculine article in dativ: Er steht hinter dem Mann", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("stand"),
        preposition: findWechselPreposition("behind"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er steht hinter dem Mann");
    });

    test("feminine article in dativ: Er steht hinter der Frau", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("stand"),
        preposition: findWechselPreposition("behind"),
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er steht hinter der Frau");
    });

    test("neuter article in dativ: Er sitzt in dem Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("sit"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sitzt in dem Haus");
    });
  });

  describe("verb direction governs case, not preposition", () => {
    test("directional verb with in → akkusativ: Er geht in das Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er geht in das Haus");
    });

    test("locative verb with in → dativ: Er sitzt in dem Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("sit"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sitzt in dem Haus");
    });
  });

  describe("verb conjugation", () => {
    test("first person singular: Ich gehe in das Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("I"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Ich gehe in das Haus");
    });

    test("first person preferPlural: Wir gehen in das Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("we"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Wir gehen in das Haus");
    });

    test("third person singular with stem change: Er läuft in das Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("run"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er läuft in das Haus");
    });
  });

  describe("pluralization", () => {
    test("directional akkusativ preferPlural: Er geht in die Häuser", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("Er geht in die Häuser");
    });

    test("locative dativ plural with -n suffix: Er sitzt in den Häusern", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("sit"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("Er sitzt in den Häusern");
    });
  });

  describe("ein-word inflection in dativ", () => {
    test("indefinite masculine in dativ: hinter einem Mann", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("stand"),
        preposition: findWechselPreposition("behind"),
        artikel: findArtikel("a / an"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er steht hinter einem Mann");
    });

    test("indefinite feminine in dativ: hinter einer Frau", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("stand"),
        preposition: findWechselPreposition("behind"),
        artikel: findArtikel("a / an"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er steht hinter einer Frau");
    });

    test("indefinite neuter in dativ: in einem Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("sit"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("a / an"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sitzt in einem Haus");
    });
  });

  describe("preferPlural ignored when unsupported", () => {
    test("indefinite article ignores preferPlural with directional verb: Er geht in ein Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("a / an"),
        noun: findNoun("house"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("Er geht in ein Haus");
    });

    test("indefinite article ignores preferPlural with locative verb: Er sitzt in einem Haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("sit"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("a / an"),
        noun: findNoun("house"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("Er sitzt in einem Haus");
    });

    test("English prompt shows singular noun when preferPlural is ignored", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("a / an"),
        noun: findNoun("house"),
        preferPlural: true,
      });

      const englishPrompt = problem.problemParts
        .map(([english]) => english)
        .join(" ");
      expect(englishPrompt).toBe("he goes in / into a / an house");
      expect(englishPrompt).not.toBe("he goes in / into a / an houses");
    });
  });

  describe("sentence capitalization", () => {
    test("pronoun is capitalized at start of sentence: Er, not er", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er geht in das Haus");
      expect(problem.solution).not.toBe("er geht in das Haus");
    });

    test("noun is always capitalized: in das Haus, not in das haus", () => {
      const problem = new SubjectVerbWechselProblem({
        pronoun: findPronoun("he"),
        verb: findIntransitiveVerb("go"),
        preposition: findWechselPreposition("in / into"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er geht in das Haus");
      expect(problem.solution).not.toBe("Er geht in das haus");
    });
  });
});
