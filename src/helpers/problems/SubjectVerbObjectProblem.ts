import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { Pronoun } from "../pronounSchema";
import { TransitiveVerb } from "../transitiveVerbSchema";
import { AbstractProblem, ProblemPart } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

/**
 * Tests a full subject + transitive-verb + article + noun sentence. The verb's
 * `form` property determines the grammatical case of the object (akkusativ or dativ).
 *
 * - "He sees the man" → "Er sieht den Mann" (akkusativ)
 * - "She helps a child" → "Sie hilft einem Kind" (dativ)
 * - "I love my women" → "Ich liebe meine Frauen" (akkusativ, plural)
 */
export class SubjectVerbObjectProblem extends AbstractProblem {
  public problemParts: readonly [
    ProblemPart<Pronoun>,
    ProblemPart<TransitiveVerb>,
    ProblemPart<Artikel>,
    ProblemPart<Noun>,
  ];
  public solution: string;

  constructor({
    pronoun,
    verb,
    artikel,
    noun,
    plural,
  }: {
    pronoun: Pronoun;
    verb: TransitiveVerb;
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
      [artikel.english, artikel],
      [englishNoun, noun],
    ];

    // German solution — verb form determined by verb.form (nominativ/akkusativ/dativ)
    const germanVerb = verb.conjugation[pronoun.person][pronoun.number];

    // Fall back to singular if this artikel has no plural form
    const artikelCase = artikel[verb.form];
    const artikelForm = plural
      ? (artikelCase.pl ?? artikelCase[noun.gender])
      : artikelCase[noun.gender];

    const nounCase = noun[verb.form];
    const germanNoun = capitalize(plural ? nounCase.plural : nounCase.singular);

    this.solution = `${capitalize(pronoun.pronoun)} ${germanVerb} ${artikelForm} ${germanNoun}`;
  }
}
