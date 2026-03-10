import { Artikel } from "../artikelSchema";
import { IntransitiveVerb } from "../intransitiveVerbSchema";
import { Noun } from "../nounSchema";
import { Preposition } from "../prepositionSchema";
import { Pronoun } from "../pronounSchema";
import { TransitiveVerb } from "../transitiveVerbSchema";
import { Wechselpreposition } from "../wechselprepositionSchema";

export type Entity =
  | Noun
  | Artikel
  | Preposition
  | Wechselpreposition
  | Pronoun
  | TransitiveVerb
  | IntransitiveVerb;
export type ProblemPart<T extends Entity = Entity> = [string, T];

/**
 * Base class for all problem types. Each problem pairs English prompts
 * (`problemParts`) with their source data objects so the UI can render
 * the question, and exposes a `solution` string the user must produce.
 */
export abstract class AbstractProblem {
  public uuid: string;
  public abstract readonly __type: string;
  public abstract problemParts: ProblemPart[];
  public abstract solution: string;

  constructor() {
    this.uuid = crypto.randomUUID();
  }
}
