import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/structural/composite/json_tree.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class CompositeScreen extends StatelessWidget {
  const CompositeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final sample = {
      'user': {
        'id': 123,
        'name': 'Ada',
        'roles': ['admin', 'editor'],
      },
      'items': [
        {'title': 'Patrones', 'price': 30},
        {'title': 'Teclado', 'price': 80},
      ],
      'active': true,
    };

    return PatternTemplate(
      heading: 'Composite',
      badge: 'Structural',
      resumen:
          'Compone objetos en estructuras de árbol para tratar elementos y compuestos uniformemente.',
      problematicaGeneral:
          'Necesitamos representar jerarquías (JSON) y recorrer/renderizar sus nodos sin diferenciar entre hojas y contenedores.',
      solucionGeneral:
          'Definir una interfaz común (JsonComponent). Implementar hojas y composites que devuelvan hijos; un cliente recorre recursivamente la estructura.',
      casoEspecifico:
          'Representar JSON como un árbol interactivo con nodos de objeto, arreglo y primitivos.',
      solucionEspecifica:
          'ArrayNode/ObjectNode/PrimitiveNode implementan JsonComponent. Un builder crea nodos recursivamente y la UI renderiza el árbol con expand/collapse.',
      codeSnippets: const [
        CodeSnippet(
          title: 'component.dart',
          code:
              'abstract class JsonComponent { String get keyLabel; bool isLeaf(); String getPreview(); List<JsonComponent> getChildren(); }',
        ),
        CodeSnippet(
          title: 'object-composite.dart',
          code:
              'class ObjectNode implements JsonComponent { /* children built from map */ }',
        ),
        CodeSnippet(
          title: 'array-composite.dart',
          code:
              'class ArrayNode implements JsonComponent { /* children built from list */ }',
        ),
      ],
      playground: JsonTreeRadix(data: sample),
      playgroundExplicacion:
          'Explora el objeto JSON de muestra. Copia rutas de nodos y expande/colapsa contenedores.',
    );
  }
}
