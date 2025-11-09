import 'expression.dart';

class MultiplicationExpression implements Expression {
  final Expression left;
  final Expression right;
  MultiplicationExpression(this.left, this.right);
  @override
  int interpret() => left.interpret() * right.interpret();
}
