import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/chain_of_responsibility/chain_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class ChainOfResponsibilityScreen extends StatelessWidget {
  const ChainOfResponsibilityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Chain of Responsibility',
      badge: 'Behavioral',
      resumen:
          'Permite pasar una petición a lo largo de una cadena de manejadores hasta que alguno la procese. Cada manejador decide procesar o delegar, desacoplando el emisor del receptor final.',
      problematicaGeneral:
          'Cuando múltiples condiciones determinan quién debe procesar una solicitud, se tiende a encadenar if/else complicados y rígidos, difíciles de extender o reordenar.',
      solucionGeneral:
          'Modelar una cadena de manejadores con una interfaz común. Cada manejador conoce al siguiente y decide si procesa la petición o la delega. El cliente sólo invoca a la cabeza de la cadena.',
      casoEspecifico:
          'Mesa de ayuda que enruta tickets por severidad y categoría: algunos se resuelven automáticamente (FAQ), otros van a Seguridad, al Soporte de Nivel 1/2, o se escalan a Gerencia.',
      solucionEspecifica:
          'Se implementan AutoResuelveFAQ, EquipoSeguridad, SoporteNivel1, SoporteNivel2 y EscalamientoGerencia. La cadena se construye con setNext() y se procesa llamando handle(ticket).',
      diagramaSolucionGeneralAssetPath:
          'assets/diagrams/real_command.png', // placeholder similar style; update if a CoR diagram asset is added
      diagramaSolucionEspecificaAssetPath:
          'assets/diagrams/command.png', // placeholder
      codeSnippets: const [
        CodeSnippet(
          title: 'types.dart',
          code:
              'enum Severity { low, medium, high }\nenum Category { billing, technical, security, other }\nclass Ticket { /* id, severity, category, description */ }',
        ),
        CodeSnippet(
          title: 'handler.dart',
          code:
              'abstract class Handler { Handler setNext(Handler h); HandleResult handle(Ticket req, {List<String>? trail}); }',
        ),
        CodeSnippet(
          title: 'auto_resuelve_faq.dart',
          code:
              'class AutoResuelveFAQ extends Handler { /* si billing+low → resuelve; else delega */ }',
        ),
        CodeSnippet(
          title: 'equipo_seguridad.dart',
          code:
              'class EquipoSeguridad extends Handler { /* si security → deriva; else delega */ }',
        ),
        CodeSnippet(
          title: 'soporte_nivel_1.dart',
          code:
              'class SoporteNivel1 extends Handler { /* si <= medium → atiende; else delega */ }',
        ),
        CodeSnippet(
          title: 'soporte_nivel_2.dart',
          code:
              'class SoporteNivel2 extends Handler { /* si technical y >= medium → asigna; else delega */ }',
        ),
        CodeSnippet(
          title: 'escalamiento_gerencia.dart',
          code:
              'class EscalamientoGerencia extends Handler { /* último eslabón */ }',
        ),
      ],
      playground: const ChainDemo(),
      playgroundExplicacion:
          'Completa el ticket y presiona “Enviar por la cadena”. Usa los atajos para prellenar casos típicos. Observa el “trail” para ver qué manejadores participaron.',
    );
  }
}
