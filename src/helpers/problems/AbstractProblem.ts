import { Artikel } from "../artikelSchema";
import { Noun } from "../nounSchema";
import { Pronoun } from "../pronounSchema";
import { Verb } from "../verbSchema";

export type Entity = Noun | Artikel | Pronoun | Verb;
export type ProblemPart<T extends Entity = Entity> = readonly [string, T];

export abstract class AbstractProblem {
  public uuid: string;
  public abstract problemParts: readonly ProblemPart[];
  public abstract solution: string;

  constructor() {
    this.uuid = crypto.randomUUID();
  }
}
