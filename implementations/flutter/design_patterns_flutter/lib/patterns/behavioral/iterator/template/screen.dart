import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/iterator/iterator_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class IteratorScreen extends StatelessWidget {
  const IteratorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Iterator',
      badge: 'Behavioral',
      resumen:
          'Proporciona una forma de acceder secuencialmente a los elementos de una colección sin exponer su estructura interna.',
      problematicaGeneral:
          'Sin un iterador, el cliente debe conocer la representación interna de la colección para recorrerla, lo que aumenta el acoplamiento y dificulta múltiples recorridos simultáneos.',
      solucionGeneral:
          'Separar la responsabilidad de recorrer una colección en un objeto iterador que encapsula el estado y la lógica de iteración.',
      casoEspecifico:
          'Reproducir una playlist: el cliente crea un iterador y avanza por las canciones, pudiendo eliminar elementos durante la iteración.',
      solucionEspecifica:
          'Se implementa un Playlist que genera un PlaylistIterator. El iterador ofrece hasNext/next/remove/reset.',
      codeSnippets: const [
        CodeSnippet(
          title: 'iterator.dart',
          code: 'abstract class IteratorIface<T> { bool hasNext(); T next(); void remove(); void reset(); }',
        ),
        CodeSnippet(
          title: 'concrete-iterator.dart',
          code: 'class PlaylistIterator implements IteratorIface<Song> { /* index, hasNext, next, remove, reset */ }',
        ),
        CodeSnippet(
          title: 'concrete-aggregate.dart',
          code: 'class Playlist implements Aggregate<Song> { List<Song> _items; createIterator() => PlaylistIterator(this); }',
        ),
      ],
      playground: const IteratorDemo(),
      playgroundExplicacion:
          'Agrega canciones, crea un iterador y recorre la playlist. Prueba eliminar canciones mientras iteras y reiniciar el iterador.',
    );
  }
}
