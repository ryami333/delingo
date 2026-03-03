import { Artikel } from "../artikelSchema";
import { IntransitiveVerb } from "../intransitiveVerbSchema";
import { Noun } from "../nounSchema";
import { Pronoun } from "../pronounSchema";
import { Wechselpreposition } from "../wechselprepositionSchema";
import { AbstractProblem, ProblemPart } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

export class SubjectVerbWechselProblem extends AbstractProblem {
  public problemParts: readonly [
    ProblemPart<Pronoun>,
    ProblemPart<IntransitiveVerb>,
    ProblemPart<Wechselpreposition>,
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
    preposition: Wechselpreposition;
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

    // The verb's direction determines the case: directional → akkusativ, locative → dativ
    const caseForm = verb.direction === "directional" ? "akkusativ" : "dativ";

    const germanVerb = verb.conjugation[pronoun.person][pronoun.number];

    const artikelCase = artikel[caseForm];
    const artikelForm = plural
      ? (artikelCase.pl ?? artikelCase[noun.gender])
      : artikelCase[noun.gender];

    const nounCase = noun[caseForm];
    const germanNoun = capitalize(plural ? nounCase.plural : nounCase.singular);

    this.solution = `${capitalize(pronoun.pronoun)} ${germanVerb} ${preposition.preposition} ${artikelForm} ${germanNoun}`;
  }
}
