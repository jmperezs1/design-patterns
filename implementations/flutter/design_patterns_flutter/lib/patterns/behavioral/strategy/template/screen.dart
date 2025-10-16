import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/pricing_catalog.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class StrategyScreen extends StatelessWidget {
  const StrategyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Strategy',
      badge: 'Behavioral',
      resumen:
          'Strategy define una familia de algoritmos, los encapsula y los hace intercambiables. El contexto puede cambiar de estrategia en tiempo de ejecución sin modificar su código.',
      problematicaGeneral:
          'Cuando hay múltiples formas de calcular un resultado (por ejemplo, pricing por tipo de cliente), el código se llena de condicionales y no es extensible.',
      solucionGeneral:
          'Extraer cada cálculo en una estrategia concreta que implemente una interfaz común. El contexto delega el cálculo a la estrategia vigente y permite cambiarla.',
      casoEspecifico:
          'Catálogo de productos con precio base y distintos descuentos según el tipo de cliente: Standard, Gold (10%), Platinum (5%), VIP (20%).',
      solucionEspecifica:
          'PricingContext expone getUnitPrice/getTotal y usa estrategias concretas (Standard/Gold/Platinum/VIP). Cambiar el tipo de cliente cambia la estrategia y el precio resultante.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_strategy.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/strategy.png',
      codeSnippets: const [
        CodeSnippet(title: 'strategy.dart', code: 'abstract class PricingStrategy {\n  double getPrice(double baseUnitPrice, int quantity);\n}\n'),
        CodeSnippet(title: 'pricing_context.dart', code: 'class PricingContext { /* ... */ }'),
        CodeSnippet(title: 'strategies/*.dart', code: 'Standard/Gold/Platinum/VIP implementan PricingStrategy'),
      ],
      playground: const PricingCatalog(),
      playgroundExplicacion:
          'Cambia el tipo de cliente y observa cómo varía el precio unitario y el total según la estrategia activa. Ajusta la cantidad para ver el cálculo en vivo.',
    );
  }
}
