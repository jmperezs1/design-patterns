import 'expression.dart';

class AdditionExpression implements Expression {
  final Expression left;
  final Expression right;
  AdditionExpression(this.left, this.right);
  @override
  int interpret() => left.interpret() + right.interpret();
}
