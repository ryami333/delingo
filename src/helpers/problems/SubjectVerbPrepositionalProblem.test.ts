import { artikelSchema } from "../artikelSchema";
import artikels from "../artikels.json";
import { intransitiveVerbSchema } from "../intransitiveVerbSchema";
import intransitiveVerbs from "../intransitiveVerbs.json";
import { nounSchema } from "../nounSchema";
import nouns from "../nouns.json";
import { prepositionSchema } from "../prepositionSchema";
import prepositions from "../prepositions.json";
import { pronounSchema } from "../pronounSchema";
import pronouns from "../pronouns.json";
import { SubjectVerbPrepositionalProblem } from "./SubjectVerbPrepositionalProblem";
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
  return intransitiveVerbSchema.parse(
    intransitiveVerbs.find((item) => item.english === english),
  );
}

function findPreposition(english: string) {
  return prepositionSchema.parse(
    prepositions.find((item) => item.english === english),
  );
}

describe("SubjectVerbPrepositionalProblem", () => {
  describe("dativ preposition — article inflection by gender", () => {
    test("masculine article in dativ after mit: mit dem Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit dem Mann");
    });

    test("feminine article in dativ after mit: mit der Frau", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit der Frau");
    });

    test("neuter article in dativ after mit: mit dem Kind", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("child"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit dem Kind");
    });
  });

  describe("akkusativ preposition — article inflection by gender", () => {
    test("masculine article in akkusativ after für: für den Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("for"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht für den Mann");
    });

    test("feminine article unchanged in akkusativ after für: für die Frau", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("for"),
        artikel: findArtikel("the"),
        noun: findNoun("woman"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht für die Frau");
    });

    test("neuter article unchanged in akkusativ after für: für das Kind", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("for"),
        artikel: findArtikel("the"),
        noun: findNoun("child"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht für das Kind");
    });
  });

  describe("preposition governs case, not verb", () => {
    test("same verb with dativ preposition: Er geht mit dem Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit dem Mann");
    });

    test("same verb with akkusativ preposition: Er geht für den Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("for"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht für den Mann");
    });
  });

  describe("verb conjugation", () => {
    test("first person singular: Ich gehe mit dem Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("I"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Ich gehe mit dem Mann");
    });

    test("first person plural: Wir gehen mit dem Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("we"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Wir gehen mit dem Mann");
    });

    test("third person singular with stem change: Er läuft durch das Haus", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("run"),
        preposition: findPreposition("through"),
        artikel: findArtikel("the"),
        noun: findNoun("house"),
        plural: false,
      });

      expect(problem.solution).toBe("Er läuft durch das Haus");
    });
  });

  describe("pluralization", () => {
    test("dativ plural with -n suffix on noun: Er geht mit den Männern", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: true,
      });

      expect(problem.solution).toBe("Er geht mit den Männern");
    });

    test("akkusativ plural: Er geht für die Männer", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("for"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: true,
      });

      expect(problem.solution).toBe("Er geht für die Männer");
    });
  });

  describe("ein-word inflection in dativ", () => {
    test("indefinite masculine in dativ: einem Mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("a / an"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit einem Mann");
    });

    test("indefinite feminine in dativ: einer Frau", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("a / an"),
        noun: findNoun("woman"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit einer Frau");
    });

    test("indefinite neuter in dativ: einem Kind", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("a / an"),
        noun: findNoun("child"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit einem Kind");
    });
  });

  describe("sentence capitalization", () => {
    test("pronoun is capitalized at start of sentence: Er, not er", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit dem Mann");
      expect(problem.solution).not.toBe("er geht mit dem Mann");
    });

    test("noun is always capitalized: mit dem Mann, not mit dem mann", () => {
      const problem = new SubjectVerbPrepositionalProblem({
        pronoun: findPronoun("he"),
        verb: findVerb("go"),
        preposition: findPreposition("with"),
        artikel: findArtikel("the"),
        noun: findNoun("man"),
        plural: false,
      });

      expect(problem.solution).toBe("Er geht mit dem Mann");
      expect(problem.solution).not.toBe("Er geht mit dem mann");
    });
  });
});
