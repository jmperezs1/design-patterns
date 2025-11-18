import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';
import '../flyweight_demo.dart';

class FlyweightScreen extends StatelessWidget {
  const FlyweightScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Flyweight',
      badge: 'Structural',
      resumen:
          'Comparte estado intrínseco entre muchas instancias para ahorrar memoria; el estado extrínseco se pasa por operación.',
      problematicaGeneral:
          'Renderizar miles de elementos similares sin crear una instancia por cada uno para ahorrar memoria.',
      solucionGeneral:
          'Crear flyweights con estado intrínseco compartido y pasar el estado extrínseco (posición, texto, color) por cada operación.',
      casoEspecifico:
          'Pool de badges: sólo se crean flyweights por variante (pill, rounded-outline, chip) y se reutilizan para miles de items.',
      solucionEspecifica:
          'BadgeFlyweight + BadgeFactory + cliente que llama operation(extrinsic) para cada item.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_flyweight.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/flyweight.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'flyweight_interface.dart',
          code:
              'abstract class FlyweightBadge { Widget operation({required String text, required double x, required double y, required String color}); }',
        ),
        CodeSnippet(
          title: 'flyweight_factory.dart',
          code:
              'class BadgeFactory { Map<String, FlyweightBadge> cache; FlyweightBadge get(String key) { /* ... */ } }',
        ),
      ],
      playground: const FlyweightDemo(),
      playgroundExplicacion:
          'Ajusta la cantidad y observa que el número de flyweights en caché permanece pequeño (dependiente de variantes).',
    );
  }
}
