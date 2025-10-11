import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/code/abstract_factory.dart'
    as af_code;
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/code/banner_factory.dart'
    as banner_code;
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/code/snackbar_factory.dart'
    as snackbar_code;
import 'package:design_patterns_flutter/patterns/creational/abstract_factory/abstract_factory_demo.dart';
import 'package:flutter/material.dart';

class AbstractFactoryScreen extends StatelessWidget {
  const AbstractFactoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Abstract Factory — Notificaciones',
      badge: 'Creacional',
      resumen:
          'Abstract Factory provee familias de productos relacionados (por ejemplo, banners/snackbars) sin acoplar al cliente a clases concretas. Permite cambiar la “skin” o variante sin tocar la UI.',
      problematicaGeneral:
          'UIs con múltiples variantes visuales terminan con condicionales dispersas para decidir qué clase instanciar. Esto dificulta el mantenimiento y las pruebas.',
      solucionGeneral:
          'Definir fábricas abstractas que crean productos coherentes entre sí. El cliente pide a la fábrica y recibe widgets ya configurados según la variante.',
      casoEspecifico:
          'El usuario prefiere ver notificaciones como banner en línea o como SnackBar flotante. La app debe soportar ambas familias sin cambiar la lógica de disparo.',
      solucionEspecifica:
          'Se implementan dos fábricas (BannerFactory y SnackbarFactory) que producen los widgets correctos para cada variante (éxito/alerta/info/aviso). El cliente (demo) sólo decide la familia.',
      diagramaSolucionGeneralAssetPath:
          'assets/diagrams/real_abstract-factory.png',
      diagramaSolucionEspecificaAssetPath:
          'assets/diagrams/abstract-factory.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'abstract_factory.dart',
          code: af_code.abstractFactory,
        ),
        CodeSnippet(
          title: 'banner_factory.dart',
          code: banner_code.bannerFactory,
        ),
        CodeSnippet(
          title: 'snackbar_factory.dart',
          code: snackbar_code.snackbarFactory,
        ),
      ],
      playground: NotificationsDualDemo(),
    );
  }
}
