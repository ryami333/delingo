export abstract class AbstractProblem {
  public uuid: string;
  public abstract problem: string;
  public abstract solution: string;

  constructor() {
    this.uuid = window.crypto.randomUUID();
  }
}
