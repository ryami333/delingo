import { Artikel } from "../artikelSchema";
import { IntransitiveVerb } from "../intransitiveVerbSchema";
import { Noun } from "../nounSchema";
import { Preposition } from "../prepositionSchema";
import { Pronoun } from "../pronounSchema";
import { AbstractProblem, ProblemPart } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

/**
 * Tests a sentence with a fixed-case preposition. The preposition's `form`
 * property determines the grammatical case of the noun phrase (always akkusativ
 * or always dativ, never varying).
 *
 * - "He walks with the man" → "Er geht mit dem Mann" (dativ)
 * - "She works for a company" → "Sie arbeitet für eine Firma" (akkusativ)
 */
export class SubjectVerbPrepositionalProblem extends AbstractProblem {
  public problemParts: readonly [
    ProblemPart<Pronoun>,
    ProblemPart<IntransitiveVerb>,
    ProblemPart<Preposition>,
    ProblemPart<Artikel>,
    ProblemPart<Noun>,
  ];
  public solution: string;

  constructor({
    pronoun,
    verb,
    preposition,
    artikel,
    noun,
    preferPlural,
  }: {
    pronoun: Pronoun;
    verb: IntransitiveVerb;
    preposition: Preposition;
    artikel: Artikel;
    noun: Noun;
    preferPlural: boolean;
  }) {
    super();

    const plural = preferPlural
      ? artikel.supportedPlurality.includes("plural")
      : false;

    // English problem
    const isThirdPersonSingular =
      pronoun.person === "thirdPerson" && pronoun.number === "singular";
    const englishVerb = isThirdPersonSingular
      ? verb.englishThirdSingular
      : verb.english;
    const englishNoun = plural ? noun.pluralEnglish : noun.english;

    this.problemParts = [
      [pronoun.english, pronoun],
      [englishVerb, verb],
      [preposition.english, preposition],
      [artikel.english, artikel],
      [englishNoun, noun],
    ];

    // The preposition governs the case
    const germanVerb = verb.conjugation[pronoun.person][pronoun.number];

    const artikelCase = artikel[preposition.form];
    const artikelForm = plural ? artikelCase.pl : artikelCase[noun.gender];

    const nounCase = noun[preposition.form];
    const germanNoun = capitalize(plural ? nounCase.plural : nounCase.singular);

    this.solution = `${capitalize(pronoun.pronoun)} ${germanVerb} ${preposition.preposition} ${artikelForm} ${germanNoun}`;
  }
}
