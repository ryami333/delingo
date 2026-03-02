import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { AbstractProblem, ProblemPart } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

export class NominalProblem extends AbstractProblem {
  public problemParts: readonly [ProblemPart<Artikel>, ProblemPart<Noun>];
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
