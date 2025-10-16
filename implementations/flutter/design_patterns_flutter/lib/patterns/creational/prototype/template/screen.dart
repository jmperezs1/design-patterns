import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

import '../client.dart';
import '../code/snippets.dart' as proto_snippets;

class PrototypeScreen extends StatelessWidget {
  const PrototypeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Prototype',
      badge: 'Creacional',
      resumen:
          'Prototype permite clonar objetos existentes para crear nuevas variantes rápidamente, sin acoplarse a constructores complejos y respetando la estructura interna.',
      problematicaGeneral:
          'Cuando un objeto tiene muchas propiedades y construirlo desde cero es costoso o repetitivo, los constructores gigantes y la duplicación de configuración complican el mantenimiento.',
      solucionGeneral:
          'Definir una interfaz Prototype con clone() y get(), y ocultar la implementación concreta que sabe hacer copias seguras (profundas) y aplicar cambios parciales (overrides).',
      casoEspecifico:
          'Editor de plantillas de email donde partimos de plantillas base (bienvenida, reset de contraseña, newsletter) y generamos variantes con pequeños ajustes de contenido.',
      solucionEspecifica:
          'EmailTemplatePrototype encapsula la plantilla base y provee clone(overrides) para combinar cambios parciales de contenido sin romper la estructura. El cliente selecciona base, aplica overrides, previsualiza y clona a un Outbox.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_prototype.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/prototype.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'prototype.dart',
          code: proto_snippets.prototypeInterface,
        ),
        CodeSnippet(
          title: 'interfaces/email_template.dart',
          code: proto_snippets.emailInterfaces,
        ),
        CodeSnippet(
          title: 'concrete-prototype.dart',
          code: proto_snippets.concretePrototype,
        ),
        CodeSnippet(title: 'client.dart', code: proto_snippets.clientDemo),
      ],
      playground: const EmailTemplateStudio(),
      playgroundExplicacion:
          'Selecciona una plantilla base y aplica “overrides” de contenido (from, subject, tokens). Al presionar clonar, se genera una copia con tus cambios y se envía al Outbox. Nada de HTML: trabajas sólo con contenido.',
    );
  }
}
