import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';
import '../facade_demo.dart';

class FacadeScreen extends StatelessWidget {
  const FacadeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Facade',
      badge: 'Structural',
      resumen:
          'Provee una interfaz unificada para un conjunto de interfaces en un subsistema, simplificando su uso para el cliente.',
      problematicaGeneral:
          'Simplificar la interacción con sistemas múltiples y complejos, centralizando orquestación y compensaciones.',
      solucionGeneral:
          'Crear una fachada (AppointmentFacade) que exponga un método simple (book) y coordine CRM, Calendario, Pagos y Notificaciones.',
      casoEspecifico:
          'Reservar una cita: la fachada orquesta upsertCustomer, reserve, authorize, createActivity, email/sms; revierte si falla el pago.',
      solucionEspecifica:
          'AppointmentFacade.book(...) que ejecuta pasos y aplica rollback si alguno falla.',
    diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_facade.png',
    diagramaSolucionEspecificaAssetPath: 'assets/diagrams/facade.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'facade.dart',
          code:
              'class AppointmentFacade { Future<Map<String,dynamic>> book({required Customer customer, required Slot slot, required Payment payment}) async { /* ... */ } }',
        ),
      ],
      playground: const FacadeDemo(),
      playgroundExplicacion:
          'Completa el formulario y pulsa Reservar. Alterna "Simular fallo de pago" para ver la compensación.',
    );
  }
}
