import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/ticket_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class StateScreen extends StatelessWidget {
  const StateScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'State',
      badge: 'Behavioral',
      resumen:
          'State permite cambiar el comportamiento de un objeto cuando su estado interno cambia. El contexto delega en objetos estado, reduciendo condicionales y mejorando la extensibilidad.',
      problematicaGeneral:
          'Clases con múltiples estados acaban llenas de if/switch para decidir qué hacer en cada momento, dificultando el mantenimiento.',
      solucionGeneral:
          'Extraer cada estado a su propia clase con una interfaz común. El contexto mantiene una referencia al estado actual y delega la operación principal, cambiando el estado según corresponda.',
      casoEspecifico:
          'Flujo de un ticket de soporte: Nuevo → En progreso → Cerrado. En “Nuevo” se confirma el borrador; en “En progreso” se van marcando tareas; al final se cierra.',
      solucionEspecifica:
          'TicketContext contiene datos y delega en estados: NewState valida y arranca, InProgressState marca la siguiente tarea y cuando se completan todas pasa a ClosedState, donde se registra el cierre.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_state.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/state.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'state.dart',
          code: 'abstract class TicketState {\n  void handleRequest();\n}\n',
        ),
        CodeSnippet(
          title: 'context.dart',
          code: 'class TicketContext { /* ... */ }',
        ),
        CodeSnippet(
          title: 'new_state.dart',
          code: 'class NewState extends TicketState { /* ... */ }',
        ),
        CodeSnippet(
          title: 'progress_state.dart',
          code: 'class InProgressState extends TicketState { /* ... */ }',
        ),
        CodeSnippet(
          title: 'closed_state.dart',
          code: 'class ClosedState extends TicketState { /* ... */ }',
        ),
      ],
      playground: const TicketDemo(),
      playgroundExplicacion:
          'En “Nuevo”, ingresa título y tareas y presiona Handle para confirmar y pasar a “En progreso”. En cada Handle siguiente se marca la próxima tarea. Al completar todas, el estado cambia a “Cerrado” y se registra la fecha.',
    );
  }
}
