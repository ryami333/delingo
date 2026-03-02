import { Artikel } from "../artikelSchema";
import { IntransitiveVerb } from "../intransitiveVerbSchema";
import { Noun } from "../nounSchema";
import { Preposition } from "../prepositionSchema";
import { Pronoun } from "../pronounSchema";
import { AbstractProblem, ProblemPart } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

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
    plural,
  }: {
    pronoun: Pronoun;
    verb: IntransitiveVerb;
    preposition: Preposition;
    artikel: Artikel;
    noun: Noun;
    plural: boolean;
  }) {
    super();

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

    // German solution — the preposition governs the case, not the verb
    const germanVerb =
      pronoun.number === "formal"
        ? verb.conjugation.thirdPerson.plural
        : verb.conjugation[pronoun.person][pronoun.number];

    const artikelCase = artikel[preposition.form];
    const artikelForm = plural
      ? (artikelCase.pl ?? artikelCase[noun.gender])
      : artikelCase[noun.gender];

    const nounCase = noun[preposition.form];
    const germanNoun = capitalize(plural ? nounCase.plural : nounCase.singular);

    this.solution = `${capitalize(pronoun.pronoun)} ${germanVerb} ${preposition.preposition} ${artikelForm} ${germanNoun}`;
  }
}
