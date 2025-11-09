import type { Mediator } from './mediator';

export abstract class Colleague {
  protected m!: Mediator;
  setMediator(m: Mediator) { this.m = m; }
}
