import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/code/code.dart'
    as factory_code;
import 'package:design_patterns_flutter/patterns/creational/factory/code/demo.dart'
    as factory_demo_code;
import 'package:design_patterns_flutter/patterns/creational/factory/code/summary.dart'
    as factory_summary;
import 'package:design_patterns_flutter/patterns/creational/factory/factory_demo.dart';
import 'package:flutter/material.dart';

class FactoryScreen extends StatelessWidget {
  const FactoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Factory',
      badge: 'Creacional',
      resumen: factory_summary.factorySummary,
      problematicaGeneral:
          'La UI necesita construir componentes visuales con estilos coherentes según un contexto (éxito, alerta, informativo, advertencia). Sin una fábrica, la lógica de estilos e iconografía se duplica en múltiples widgets, generando inconsistencias y mayor costo de mantenimiento.',
      solucionGeneral:
          'Encapsular la creación de widgets en una función/clase fábrica que reciba un parámetro (p. ej. variante) y devuelva un componente configurado. Así se centraliza la decisión de colores, iconos y layout, aportando una única interfaz de construcción.',
      casoEspecifico:
          'Mensajes de estado (success/alert/informative/warning) que deben lucir y comportarse de forma consistente a lo largo de la app.',
      solucionEspecifica:
          'La función createWrapper(variant, child) actúa como fábrica: a partir de la variante selecciona paleta de colores, icono y estructura del contenedor, y retorna un widget listo para usar en la UI.',
        diagramaSolucionGeneralAssetPath: null,
        diagramaSolucionEspecificaAssetPath: null,
      codeSnippets: const [
        CodeSnippet(title: 'factory.dart', code: factory_code.kFactorySource),
        CodeSnippet(title: 'demo.dart', code: factory_demo_code.factoryDemo),
      ],
      playground: const FactoryDemo(),
      playgroundExplicacion:
          'Selecciona una variante (success/alert/info/warning) y observa cómo la fábrica devuelve un contenedor preconfigurado con colores e icono coherentes. Cambia el texto hijo para ver el estilo aplicado por la Factory.',
    );
  }
}
