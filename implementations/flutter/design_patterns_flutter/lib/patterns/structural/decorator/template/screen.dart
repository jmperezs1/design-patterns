import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';
import '../decorator_demo.dart';

class DecoratorScreen extends StatelessWidget {
  const DecoratorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Decorator',
      badge: 'Structural',
      resumen:
          'Adjunta responsabilidades adicionales a un objeto dinámicamente. Ofrece una alternativa a subclases para extender funcionalidad.',
      problematicaGeneral:
          'Queremos añadir características a un objeto (p. ej. ingredientes a una hamburguesa) sin crear una explosión de subclases.',
      solucionGeneral:
          'Crear un Decorator que implemente la misma interfaz que el componente y que envuelva al componente objetivo, delegando comportamiento y agregando nueva funcionalidad.',
      casoEspecifico:
          'Modelar una hamburguesa base y aplicar add-ons (queso, tocineta, carne extra) como decoradores que ajustan descripción y precio.',
      solucionEspecifica:
          'Burger (interfaz) + PlainBurger (componente base) + BurgerDecorator (abstracto) + Cheese/Bacon/Double decorators. Un cliente construye el pedido envolviendo el objeto en sucesivos decoradores.',
    diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_decorator.png',
    diagramaSolucionEspecificaAssetPath: 'assets/diagrams/decorator.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'burger.dart',
          code:
              'abstract class Burger { String getDescription(); double getCost(); }',
        ),
        CodeSnippet(
          title: 'burger_decorator.dart',
          code:
              'abstract class BurgerDecorator implements Burger { final Burger wrappee; BurgerDecorator(this.wrappee); String getDescription() => wrappee.getDescription(); double getCost() => wrappee.getCost(); }',
        ),
        CodeSnippet(
          title: 'cheese_decorator.dart',
          code:
              r'class CheeseDecorator extends BurgerDecorator { CheeseDecorator(super.wrappee); @override String getDescription() => wrappee.getDescription() + " + queso"; @override double getCost() => wrappee.getCost() + 0.75; }',
        ),
      ],
      playground: const DecoratorDemo(),
      playgroundExplicacion:
          'Selecciona add-ons y observa cómo se envuelve la hamburguesa base con decoradores en orden, mostrando Δ precio y subtotal.',
    );
  }
}
