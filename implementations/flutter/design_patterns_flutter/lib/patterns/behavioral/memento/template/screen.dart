import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/memento/memento_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class MementoScreen extends StatelessWidget {
  const MementoScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Memento',
      badge: 'Behavioral',
      resumen:
          'Memento captura y externaliza el estado interno de un objeto para poder restaurarlo más tarde sin violar el encapsulamiento.',
      problematicaGeneral:
          'Implementar deshacer/rehacer puede romper encapsulamiento si se expone todo el estado. También complica la gestión del historial.',
      solucionGeneral:
          'El Originador crea Mementos con su estado. El Caretaker guarda el historial y restaura snapshots sin conocer detalles internos.',
      casoEspecifico:
          'Un editor de texto con checkpoints: se pueden crear snapshots, deshacer al anterior o rehacer, limpiando el stack de rehacer al crear un nuevo checkpoint.',
      solucionEspecifica:
          'Definimos EditorOriginator (estado del texto), EditorMemento (snapshot) y EditorCaretaker (gestiona pilas de undo/redo).',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_memento.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/memento.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'memento.dart',
          code: 'class EditorMemento { /* text, createdAt, getState() */ }',
        ),
        CodeSnippet(
          title: 'originator.dart',
          code:
              'class EditorOriginator { /* setText, getText, createMemento, setMemento */ }',
        ),
        CodeSnippet(
          title: 'caretaker.dart',
          code:
              'class EditorCaretaker { /* undo/redo stacks, checkpoint, undo, redo, history */ }',
        ),
      ],
      playground: const MementoDemo(),
      playgroundExplicacion:
          'Escribe en el editor, guarda checkpoints y usa deshacer/rehacer. Los detalles del estado permanecen encapsulados en el Originador.',
    );
  }
}
