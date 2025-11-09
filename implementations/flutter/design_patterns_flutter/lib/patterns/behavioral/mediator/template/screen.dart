import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/mediator/mediator_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class MediatorScreen extends StatelessWidget {
  const MediatorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Mediator',
      badge: 'Behavioral',
      resumen:
          'El Mediator centraliza la comunicación entre componentes, reduciendo acoplamientos directos y dependencias entre ellos.',
      problematicaGeneral:
          'Cuando múltiples componentes interactúan entre sí directamente, el grafo de dependencias crece y el sistema se vuelve frágil y difícil de mantener.',
      solucionGeneral:
          'Introducir un objeto Mediator que encapsule las colaboraciones. Los componentes (colegas) notifican eventos al mediador en lugar de referenciarse entre sí.',
      casoEspecifico:
          'Un buscador con filtro de categoría y botón de limpieza. La caja de búsqueda, el filtro, la lista de resultados y el botón no se conocen entre sí.',
      solucionEspecifica:
          'Se define un Mediator concreto que recibe eventos: cambio de búsqueda (A), cambio de categoría (C) y acción de limpiar (D). Con esos eventos, filtra un dataset y actualiza la lista (B); también produce un registro de eventos.',
      codeSnippets: const [
        CodeSnippet(
          title: 'mediator.dart',
          code:
              'abstract class Mediator { void notify(Colleague sender, String event, [Object? payload]); }',
        ),
        CodeSnippet(
          title: 'colleague.dart',
          code:
              'abstract class Colleague { late Mediator m; void setMediator(Mediator mediator) { m = mediator; } }',
        ),
        CodeSnippet(
          title: 'concrete_mediator.dart',
          code:
              'class ConcreteMediator implements Mediator { /* coordina colegas y filtra resultados */ }',
        ),
        CodeSnippet(
          title: 'concrete_colleague_a.dart',
          code:
              'class SearchBox extends Colleague { /* notifica cambios de query */ }',
        ),
        CodeSnippet(
          title: 'concrete_colleague_b.dart',
          code:
              'class ResultsList extends Colleague { /* mantiene la vista filtrada */ }',
        ),
        CodeSnippet(
          title: 'concrete_colleague_c.dart',
          code:
              'class CategoryFilter extends Colleague { /* notifica cambios de categoría */ }',
        ),
        CodeSnippet(
          title: 'concrete_colleague_d.dart',
          code:
              'class ClearButton extends Colleague { /* resetea estado mediante el mediador */ }',
        ),
      ],
      playground: const MediatorDemo(),
      playgroundExplicacion:
          'Escribe en buscar o cambia la categoría. Observa cómo la lista de resultados y el registro de eventos se actualizan a través del Mediator.',
    );
  }
}
