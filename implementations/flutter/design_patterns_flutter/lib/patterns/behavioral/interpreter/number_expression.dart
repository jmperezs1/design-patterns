import 'expression.dart';

class NumberExpression implements Expression {
  final int value;
  NumberExpression(this.value);
  @override
  int interpret() => value;
}
