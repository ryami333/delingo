import { artikelSchema } from "../artikelSchema";
import artikels from "../artikels.json";
import { nounSchema } from "../nounSchema";
import nouns from "../nouns.json";
import { NominalProblem } from "./NominalProblem";
import { describe, expect, test } from "vitest";

function findArtikel(english: string) {
  return artikelSchema.parse(artikels.find((item) => item.english === english));
}

function findNoun(english: string) {
  return nounSchema.parse(nouns.find((item) => item.english === english));
}

describe("NominalProblem", () => {
  describe("definite article gender inflection", () => {
    test("definite article inflects for masculine in nominative: der Mann", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("der Mann");
    });

    test("definite article inflects for feminine in nominative: die Frau", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("die Frau");
    });

    test("definite article inflects for neuter in nominative: das Kind", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("child"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("das Kind");
    });
  });

  describe("pluralization", () => {
    test("definite article collapses to die in nominative preferPlural: die Männer", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("die Männer");
    });

    test("noun takes its plural form: die Frauen", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("die Frauen");
    });

    test("noun takes its plural form: die Kinder", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("child"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("die Kinder");
    });
  });

  describe("ein-word inflection", () => {
    test("indefinite article inflects for masculine in nominative: ein Mann", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("a / an"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("ein Mann");
    });

    test("indefinite article inflects for feminine in nominative: eine Frau", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("a / an"),
        noun: findNoun("woman"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("eine Frau");
    });

    test("indefinite article inflects for neuter in nominative: ein Kind", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("a / an"),
        noun: findNoun("child"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("ein Kind");
    });
  });

  describe("possessive and negative article plurals", () => {
    test("negative article has a plural form: keine Männer", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("no / not a"),
        noun: findNoun("man"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("keine Männer");
    });

    test("possessive article has a plural form: meine Kinder", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("my"),
        noun: findNoun("child"),
        preferPlural: true,
      });

      expect(problem.solution).toBe("meine Kinder");
    });
  });

  describe("noun-phrase capitalization", () => {
    test("article is lowercase in noun phrases: der Mann, not Der Mann", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("der Mann");
      expect(problem.solution).not.toBe("Der Mann");
    });

    test("noun is capitalized in noun phrases: der Mann, not der mann", () => {
      const problem = new NominalProblem({
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        preferPlural: false,
      });

      expect(problem.solution).toBe("der Mann");
      expect(problem.solution).not.toBe("der mann");
    });
  });
});
