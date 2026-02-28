import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { AbstractProblem } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

export class NominalProblem extends AbstractProblem {
  public problemParts: readonly [string, string];
  public solution: string;

  constructor({
    artikel,
    noun,
    plural,
  }: {
    artikel: Artikel;
    noun: Noun;
    plural: boolean;
  }) {
    super();

    const artikelProblem = capitalize(artikel.english);
    const nounProblem = plural ? noun.pluralEnglish : noun.english;
    this.problemParts = [artikelProblem, nounProblem];

    const artikelSolution = artikel.nominativ[plural ? "pl" : noun.gender];
    const nounSolution = plural ? noun.pluralNoun : noun.noun;
    this.solution = `${artikelSolution} ${nounSolution}`;
  }
}
