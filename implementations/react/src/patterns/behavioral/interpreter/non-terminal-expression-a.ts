import type { Expression } from "./interpreter";

class AdditionExpression implements Expression {
    private readonly left: Expression;
    private readonly right: Expression;
  constructor(left: Expression, right: Expression) {
    this.left = left;
    this.right = right;
  }
  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

export { AdditionExpression };