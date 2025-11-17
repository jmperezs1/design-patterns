import type { Expression } from "./interpreter";

/**
 * Expresión terminal que representa un número en el patrón Interpreter.
 */
class NumberExpression implements Expression {
  private readonly value: number;
  constructor(value: number) {
    this.value = value;
  }
  interpret(): number {
    return this.value;
  }
}

export { NumberExpression };