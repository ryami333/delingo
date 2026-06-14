import { Artikel } from "../lexicon/artikelSchema";
import { IntransitiveVerb } from "../lexicon/intransitiveVerbSchema";
import { Noun } from "../lexicon/nounSchema";
import { Preposition } from "../lexicon/prepositionSchema";
import { Pronoun } from "../lexicon/pronounSchema";
import { TransitiveVerb } from "../lexicon/transitiveVerbSchema";
import { Wechselpreposition } from "../lexicon/wechselprepositionSchema";

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
