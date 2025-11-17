import type { Expression } from "./interpreter";

/**
 * Expresión no terminal que representa una multiplicación en el patrón Interpreter.
 */

class MultiplicationExpression implements Expression {
    private readonly left: Expression;
    private readonly right: Expression

  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }

  /**
   * 
   * Interpreta la multiplicacion
   */
  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}
export { MultiplicationExpression };