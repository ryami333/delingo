export type ProblemPart<T = unknown> = readonly [string, T];

export abstract class AbstractProblem {
  public uuid: string;
  public abstract problemParts: readonly ProblemPart[];
  public abstract solution: string;

  constructor() {
    this.uuid = crypto.randomUUID();
  }
}
