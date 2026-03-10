import { artikelSchema } from "../artikelSchema";
import artikels from "../artikels.json";
import { nounSchema } from "../nounSchema";
import nouns from "../nouns.json";
import { pronounSchema } from "../pronounSchema";
import pronouns from "../pronouns.json";
import { transitiveVerbSchema } from "../transitiveVerbSchema";
import transitiveVerbs from "../transitiveVerbs.json";
import { SubjectVerbObjectProblem } from "./SubjectVerbObjectProblem";
import { describe, expect, test } from "vitest";

function findArtikel(english: string) {
  return artikelSchema.parse(artikels.find((item) => item.english === english));
}

function findNoun(english: string) {
  return nounSchema.parse(nouns.find((item) => item.english === english));
}

function findPronoun(english: string) {
  return pronounSchema.parse(pronouns.find((item) => item.english === english));
}

function findVerb(english: string) {
  return transitiveVerbSchema.parse(
    transitiveVerbs.find((item) => item.english === english),
  );
}

describe("SubjectVerbObjectProblem", () => {
  describe("akkusativ article inflection by gender", () => {
    test("masculine article changes in akkusativ: der → den Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht den Mann");
    });

    test("feminine article stays unchanged in akkusativ: die Frau", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht die Frau");
    });

    test("neuter article stays unchanged in akkusativ: das Kind", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("child"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht das Kind");
    });
  });

  describe("dativ article inflection by gender", () => {
    test("masculine article in dativ: der → dem Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("help"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er hilft dem Mann");
    });

    test("feminine article in dativ: die → der Frau", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("help"),
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er hilft der Frau");
    });

    test("neuter article in dativ: das → dem Kind", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("help"),
        artikel: findArtikel("the"),
        noun: findNoun("child"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er hilft dem Kind");
    });
  });

  describe("nominativ-governing verbs", () => {
    test("copular verb keeps object in nominative case: Er ist der Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("am / are / is"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er ist der Mann");
    });

    test("werden keeps object in nominative case: Er wird der Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("become"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er wird der Mann");
    });
  });

  describe("verb conjugation", () => {
    test("first person singular: Ich sehe den Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("I"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Ich sehe den Mann");
    });

    test("first person preferPlural: Wir sehen den Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("we"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Wir sehen den Mann");
    });

    test("third person singular with stem change: Er sieht den Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht den Mann");
    });

    test("third person preferPlural: Sie sehen den Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("they"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Sie sehen den Mann");
    });
  });

  describe("pluralization", () => {
    test("akkusativ plural article and noun: Er sieht die Männer", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("Er sieht die Männer");
    });

    test("dativ plural article and noun with -n suffix: Er hilft den Männern", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("help"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("Er hilft den Männern");
    });
  });

  describe("ein-word inflection in akkusativ", () => {
    test("indefinite masculine changes in akkusativ: ein → einen Mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("a / an"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht einen Mann");
    });

    test("indefinite feminine unchanged in akkusativ: eine Frau", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("a / an"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht eine Frau");
    });

    test("indefinite neuter unchanged in akkusativ: ein Kind", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("a / an"),
        noun: findNoun("child"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht ein Kind");
    });
  });

  describe("sentence capitalization", () => {
    test("pronoun is capitalized at start of sentence: Er, not er", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht den Mann");
      expect(problem.solution).not.toBe("er sieht den Mann");
    });

    test("noun is always capitalized: den Mann, not den mann", () => {
      const problem = new SubjectVerbObjectProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("see"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("Er sieht den Mann");
      expect(problem.solution).not.toBe("Er sieht den mann");
    });
  });
});
