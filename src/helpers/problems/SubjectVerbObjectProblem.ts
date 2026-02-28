import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { Pronoun } from "../pronounSchema";
import { Verb } from "../verbSchema";
import { AbstractProblem } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

export class SubjectVerbObjectProblem extends AbstractProblem {
  public problemParts: readonly [string, string, string, string];
  public solution: string;

  constructor({
    pronoun,
    verb,
    artikel,
    noun,
    plural,
  }: {
    pronoun: Pronoun;
    verb: Verb;
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
    this.problemParts = [pronoun.english, englishVerb, artikel.english, englishNoun];

    // German solution — verb form determined by verb.form (nominativ/akkusativ/dativ/genitiv)
    // Formal "Sie" always conjugates identically to 1st/3rd person plural in German
    const germanVerb =
      pronoun.number === "formal"
        ? verb.conjugation.thirdPerson.plural
        : verb.conjugation[pronoun.person][pronoun.number];

    // Fall back to singular if this artikel has no plural form
    const artikelCase = artikel[verb.form];
    const artikelForm = plural
      ? (artikelCase.pl ?? artikelCase[noun.gender])
      : artikelCase[noun.gender];
    const germanNoun = capitalize(plural ? noun.pluralNoun : noun.noun);

    this.solution = `${capitalize(pronoun.pronoun)} ${germanVerb} ${artikelForm} ${germanNoun}`;
  }
}
