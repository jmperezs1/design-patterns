import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/interpreter/interpreter_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class InterpreterScreen extends StatelessWidget {
  const InterpreterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Interpreter',
      badge: 'Behavioral',
      resumen:
          'Interpreter define una gramática sencilla y usa un árbol de expresiones para evaluar sentencias de esa gramática.',
      problematicaGeneral:
          'Cuando reglas/gramáticas cambian poco pero se evalúan mucho, codificar con if/else se vuelve rígido y repetitivo.',
      solucionGeneral:
          'Modelar cada construcción de la gramática como una Expression con interpret(); combinar expresiones para formar árboles evaluables.',
      casoEspecifico:
          'Aritmética básica con enteros: suma (+) y multiplicación (*) con paréntesis y precedencia estándar (* sobre +).',
      solucionEspecifica:
          'Se crean NumberExpression (terminal), AdditionExpression y MultiplicationExpression (no terminales). Un parser convierte la entrada a RPN (shunting-yard) y construye el árbol.',
    diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_interpreter.png',
    diagramaSolucionEspecificaAssetPath: 'assets/diagrams/interpreter.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'expression.dart',
          code: 'abstract class Expression { int interpret(); }',
        ),
        CodeSnippet(
          title: 'number_expression.dart',
          code: 'class NumberExpression implements Expression { /* ... */ }',
        ),
        CodeSnippet(
          title: 'addition_expression.dart',
          code: 'class AdditionExpression implements Expression { /* ... */ }',
        ),
        CodeSnippet(
          title: 'multiplication_expression.dart',
          code:
              'class MultiplicationExpression implements Expression { /* ... */ }',
        ),
        CodeSnippet(
          title: 'parser.dart',
          code:
              '({Expression expr, String rpn}) parseToExpression(String src) { /* ... */ }',
        ),
      ],
      playground: const InterpreterDemo(),
      playgroundExplicacion:
          'Escribe una expresión, presiona Evaluar: verás el resultado y la forma en Notación Polaca Inversa (RPN).',
    );
  }
}
