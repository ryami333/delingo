import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { AbstractProblem, ProblemPart } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

/**
 * Tests nominative article + noun agreement. Given an English article and noun,
 * the user must produce the correct German nominative form.
 *
 * - "The man" → "der Mann"
 * - "A child" → "ein Kind"
 * - "My women" → "meine Frauen"
 * - "No house" → "kein Haus"
 */
export class NominalProblem extends AbstractProblem {
  public problemParts: readonly [ProblemPart<Artikel>, ProblemPart<Noun>];
  public solution: string;

  constructor({
    artikel,
    noun,
    preferPlural,
  }: {
    artikel: Artikel;
    noun: Noun;
    preferPlural: boolean;
  }) {
    super();

    const plural = preferPlural
      ? artikel.supportedPlurality.includes("plural")
      : false;

    const artikelProblem = capitalize(artikel.english);
    const nounProblem = plural ? noun.pluralEnglish : noun.english;
    this.problemParts = [
      [artikelProblem, artikel],
      [nounProblem, noun],
    ];

    const artikelSolution = artikel.nominativ[plural ? "pl" : noun.gender];
    const nounSolution = plural
      ? noun.nominativ.plural
      : noun.nominativ.singular;
    this.solution = `${artikelSolution} ${nounSolution}`;
  }
}
