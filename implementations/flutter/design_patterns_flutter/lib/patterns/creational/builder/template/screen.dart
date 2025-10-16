import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:design_patterns_flutter/patterns/creational/builder/builder_demo.dart';
import 'package:flutter/material.dart';

import '../code/builder_code.dart' as builder_code;
import '../code/snippets.dart' as snippets;

class BuilderScreen extends StatelessWidget {
  const BuilderScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Builder',
      badge: 'Creacional',
      resumen:
          'Builder separa la construcción de un objeto complejo de su representación. Permite crear productos paso a paso, con orden y partes opcionales, sin que el cliente conozca detalles internos.',
      problematicaGeneral:
          'Construir objetos con múltiples pasos y partes opcionales suele terminar en constructores enormes o en código cliente lleno de condicionales difíciles de mantener.',
      solucionGeneral:
          'Introducir un Builder con una API fluida para configurar partes y un Director que orquesta el orden de construcción. El cliente indica intención; el builder materializa los pasos.',
      casoEspecifico:
          'Tarjeta de producto con secciones opcionales: título, subtítulo, imagen, cuerpo y pie. No todas las secciones son obligatorias y el orden de armado importa.',
      solucionEspecifica:
          'Definimos un CardConcreteBuilder con métodos para cada sección y un CardDirector que conoce el flujo recomendado. Pasando valores opcionales, el director invoca los pasos necesarios y produce un CardProduct listo para renderizar.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_builder.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/builder.png',
      codeSnippets: const [
        CodeSnippet(title: 'builder.dart', code: builder_code.builderInterface),
        CodeSnippet(
          title: 'concrete_builder.dart',
          code: snippets.concreteBuilderCode,
        ),
        CodeSnippet(title: 'director.dart', code: snippets.directorCode),
        CodeSnippet(title: 'product/card.dart', code: snippets.productCardCode),
        CodeSnippet(title: 'builder_demo.dart', code: snippets.demoCode),
      ],
      playground: const BuilderDemo(),
      playgroundExplicacion:
          'Completa campos opcionales (título, subtítulo, imagen, cuerpo, pie). El Director orquesta los pasos del Builder y genera la tarjeta final. Quita/añade partes y observa cómo cambia el producto sin tocar la construcción interna.',
    );
  }
}
