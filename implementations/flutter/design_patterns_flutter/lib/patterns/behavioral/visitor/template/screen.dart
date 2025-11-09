import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/visitor/visitor_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class VisitorScreen extends StatelessWidget {
  const VisitorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Visitor',
      badge: 'Behavioral',
      resumen: 'Representa una operación a realizar sobre los elementos de una estructura sin cambiar las clases sobre las que opera.',
      problematicaGeneral: 'Cuando operaciones distintas deben realizarse sobre una colección de objetos con clases heterogéneas y no quieres acoplar esas operaciones a las clases.',
      solucionGeneral: 'Definir un Visitor con métodos visitX para cada tipo de elemento; cada elemento implementa accept(visitor).',
      casoEspecifico: 'Carrito de compras con distintos tipos de ítems: libros, electrónica, alimentos. Aplicar visitantes para totales, envío y exportación CSV.',
      solucionEspecifica: 'Cada elemento implementa accept(). Los visitantes calculan totales o exportan sin modificar la jerarquía de elementos.',
      codeSnippets: const [
        CodeSnippet(title: 'element.dart', code: 'abstract class Element { void accept(Visitor v); }'),
        CodeSnippet(title: 'visitor.dart', code: 'abstract class Visitor { void visitBook(Book b); void visitElectronics(Electronics e); void visitGrocery(Grocery g); }'),
      ],
      playground: const VisitorDemo(),
      playgroundExplicacion: 'Agrega ítems al carrito y aplica operaciones: calcular totales, estimar envío o exportar CSV.',
    );
  }
}
