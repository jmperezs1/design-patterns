import 'expression.dart';
import 'number_expression.dart';
import 'addition_expression.dart';
import 'multiplication_expression.dart';

sealed class Tok {}

class NumTok extends Tok {
  final int value;
  NumTok(this.value);
}

class OpTok extends Tok {
  final String op;
  OpTok(this.op);
}

class ParTok extends Tok {
  final String par;
  ParTok(this.par);
}

List<Tok> tokenize(String src) {
  final out = <Tok>[];
  int i = 0;
  while (i < src.length) {
    final c = src[i];
    if (c == ' ') {
      i++;
      continue;
    }
    if (c == '+' || c == '*') {
      out.add(OpTok(c));
      i++;
      continue;
    }
    if (c == '(' || c == ')') {
      out.add(ParTok(c));
      i++;
      continue;
    }
    if (RegExp(r'\d').hasMatch(c)) {
      var j = i;
      while (j < src.length && RegExp(r'\d').hasMatch(src[j])) j++;
      out.add(NumTok(int.parse(src.substring(i, j))));
      i = j;
      continue;
    }
    throw FormatException("Token inválido en posición ${i + 1}: '$c'");
  }
  return out;
}

int _prec(String op) => op == '+' ? 1 : 2;

({Expression expr, String rpn}) parseToExpression(String src) {
  final tokens = tokenize(src);
  final output = <Tok>[];
  final ops = <String>[];

  for (final t in tokens) {
    if (t is NumTok) {
      output.add(t);
    } else if (t is OpTok) {
      while (ops.isNotEmpty) {
        final top = ops.last;
        if (top == '(') break;
        if (_prec(top) >= _prec(t.op)) {
          output.add(OpTok(ops.removeLast()));
        } else {
          break;
        }
      }
      ops.add(t.op);
    } else if (t is ParTok && t.par == '(') {
      ops.add('(');
    } else if (t is ParTok && t.par == ')') {
      while (ops.isNotEmpty && ops.last != '(') {
        output.add(OpTok(ops.removeLast()));
      }
      if (ops.isEmpty) throw FormatException('Paréntesis desbalanceados');
      ops.removeLast();
    }
  }
  while (ops.isNotEmpty) {
    final o = ops.removeLast();
    if (o == '(') throw FormatException('Paréntesis desbalanceados');
    output.add(OpTok(o));
  }

  final stack = <Expression>[];
  for (final t in output) {
    if (t is NumTok) {
      stack.add(NumberExpression(t.value));
    } else if (t is OpTok) {
      if (stack.length < 2) throw FormatException('Expresión inválida');
      final b = stack.removeLast();
      final a = stack.removeLast();
      if (t.op == '+')
        stack.add(AdditionExpression(a, b));
      else
        stack.add(MultiplicationExpression(a, b));
    }
  }
  if (stack.length != 1) throw FormatException('Expresión inválida');
  final rpn = output
      .map(
        (t) => t is NumTok
            ? t.value.toString()
            : t is OpTok
            ? t.op
            : (t as ParTok).par,
      )
      .join(' ');
  return (expr: stack.single, rpn: rpn);
}
