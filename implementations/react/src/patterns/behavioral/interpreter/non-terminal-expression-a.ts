import type { Expression } from "./interpreter";

/**
 * Expresión no terminal que representa una suma en el patrón Interpreter.
 */

class AdditionExpression implements Expression {
    private readonly left: Expression;
    private readonly right: Expression;
  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }
    /**
     * 
     * Interpreta la expresión sumando los resultados de las expresiones izquierda y derecha.
     */
  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

export { AdditionExpression };