import { Artikel } from "../artikelSchema";
import { IntransitiveVerb } from "../intransitiveVerbSchema";
import { Noun } from "../nounSchema";
import { Preposition } from "../prepositionSchema";
import { Pronoun } from "../pronounSchema";
import { TransitiveVerb } from "../transitiveVerbSchema";

export type Entity =
  | Noun
  | Artikel
  | Preposition
  | Pronoun
  | TransitiveVerb
  | IntransitiveVerb;
export type ProblemPart<T extends Entity = Entity> = readonly [string, T];

export abstract class AbstractProblem {
  public uuid: string;
  public abstract problemParts: readonly ProblemPart[];
  public abstract solution: string;

  constructor() {
    this.uuid = crypto.randomUUID();
  }
}
