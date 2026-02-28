export abstract class AbstractProblem {
  public uuid: string;
  public abstract problemParts: readonly string[];
  public abstract solution: string;

  constructor() {
    this.uuid = window.crypto.randomUUID();
  }
}
