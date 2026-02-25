import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { AbstractProblem } from "./AbstractProblem";
import capitalize from "lodash/capitalize";

export class NominalProblem extends AbstractProblem {
  public problem: string;
  public solution: string;

  constructor({ artikel, noun }: { artikel: Artikel; noun: Noun }) {
    super();

    const plural = Math.random() > 0.75; // One-quarter of the time

    const artikelProblem = artikel.english;
    const nounProblem = plural ? noun.pluralEnglish : noun.english;
    this.problem = capitalize(`${artikelProblem} ${nounProblem}`);

    const artikelSolution = artikel.nominativ[plural ? "pl" : noun.gender];
    const nounSolution = capitalize(plural ? noun.pluralNoun : noun.noun);
    this.solution = `${artikelSolution} ${nounSolution}`;
  }
}
