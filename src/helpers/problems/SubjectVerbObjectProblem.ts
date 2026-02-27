import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { Pronoun } from "../pronounSchema";
import { Verb } from "../verbSchema";
import { AbstractProblem } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

export class SubjectVerbObjectProblem extends AbstractProblem {
  public problem: string;
  public solution: string;

  constructor({
    pronoun,
    verb,
    artikel,
    noun,
  }: {
    pronoun: Pronoun;
    verb: Verb;
    artikel: Artikel;
    noun: Noun;
  }) {
    super();

    const plural = Math.random() > 0.75; // One-quarter of the time

    // English problem
    const isThirdPersonSingular =
      pronoun.person === "thirdPerson" && pronoun.number === "singular";
    const englishVerb = isThirdPersonSingular
      ? verb.englishThirdSingular
      : verb.english;
    const englishNoun = plural ? noun.pluralEnglish : noun.english;
    this.problem = `${pronoun.english} ${englishVerb} ${artikel.english} ${englishNoun}`;

    // German solution — object takes accusative case
    const personGroup = verb.conjugation[pronoun.person];
    // "formal" only occurs with secondPerson, which has the "formal" key
    const germanVerb = (personGroup as Record<string, string>)[pronoun.number];

    // Fall back to singular if this artikel has no plural form
    const akkusativForm = plural
      ? (artikel.akkusativ.pl ?? artikel.akkusativ[noun.gender])
      : artikel.akkusativ[noun.gender];
    const germanNoun = capitalize(plural ? noun.pluralNoun : noun.noun);

    this.solution = `${capitalize(pronoun.pronoun)} ${germanVerb} ${akkusativForm} ${germanNoun}`;
  }
}
