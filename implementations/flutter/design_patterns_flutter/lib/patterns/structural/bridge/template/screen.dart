import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

import '../bridge_demo.dart';

class BridgeScreen extends StatelessWidget {
  const BridgeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const PatternTemplate(
      heading: 'Bridge',
      badge: 'Structural',
      resumen:
          'Bridge desacopla una abstracción de su implementación, permitiendo que ambas varíen de forma independiente. Ideal cuando necesitas combinar N abstracciones con M implementaciones sin multiplicar clases.',
      problematicaGeneral:
          'Sin Bridge, tenderías a crear combinaciones (Abstracción×Implementación) rígidas. Esto escala mal y acopla fuerte. Además, cambiar la implementación impacta la jerarquía de la abstracción.',
      solucionGeneral:
          'Define una Abstracción que mantiene una referencia a un Implementor. La Abstracción delega el trabajo específico en el Implementor, permitiendo cambiarlo en tiempo de ejecución.',
      casoEspecifico:
          'Reportes (Órdenes/Inventario) que pueden exportarse a CSV o JSON. Las distintas combinaciones funcionan sin crear clases por cada par. La Abstracción (Report) usa un Exporter intercambiable.',
      solucionEspecifica:
          'OrdersReport e InventoryReport construyen los datos (ReportData) y delegan el formato en CsvExporter o JsonExporter. generateReport() invoca export() del implementor seleccionado.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_bridge.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/bridge.png',
      codeSnippets: [
        CodeSnippet(
          title: 'abstraction.dart',
          code: 'abstract class Report { /* ... */ }',
        ),
        CodeSnippet(
          title: 'implementor.dart',
          code: 'abstract class Exporter { /* ... */ }',
        ),
      ],
      playground: BridgeDemo(),
      playgroundExplicacion:
          'Selecciona el tipo de reporte y el exportador. "Exportar" genera el texto de salida. Gracias a Bridge, puedes combinar libremente reportes con exportadores sin crear combinaciones estáticas.',
    );
  }
}
