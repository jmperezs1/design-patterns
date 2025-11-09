import type { Expression } from './interpreter';

export class NumberExpression implements Expression {
  private readonly value: number;
  constructor(value: number) {
    this.value = value;
  }
  interpret(): number {
    return this.value;
  }
}
