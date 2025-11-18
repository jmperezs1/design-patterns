import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

import '../adaptee.dart';
import '../adapter.dart';
import '../adapter_demo.dart';

class AdapterScreen extends StatelessWidget {
  const AdapterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final api = Adapter(Adaptee());
    return PatternTemplate(
      heading: 'Adapter',
      badge: 'Structural',
      resumen:
          'Adapter permite que dos interfaces incompatibles trabajen juntas envolviendo (wrapping) un objeto existente con una interfaz esperada por el cliente.',
      problematicaGeneral:
          'Cuando el cliente espera una interfaz pero el sistema existente expone otra (p. ej., una API que retorna CSV en lugar de objetos), el acoplamiento directo obliga a cambios invasivos o duplicación de código.',
      solucionGeneral:
          'Crear un adaptador que implemente la interfaz objetivo (Target) y traduzca la interfaz del Adaptee a la esperada por el cliente. Así, el cliente interactúa con Target sin conocer detalles internos.',
      casoEspecifico:
          'Tenemos un servicio que devuelve datos en formato CSV (Adaptee). La UI espera una lista de usuarios tipados. El Adapter convierte el CSV en List<User> expuesto mediante Target.request().',
      solucionEspecifica:
          'El Adapter recibe el Adaptee, invoca specificRequest() (CSV) y lo transforma en objetos User. La UI sólo usa Target.request() y muestra una tabla con búsqueda y paginación.',
  diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_adapter.png',
  diagramaSolucionEspecificaAssetPath: 'assets/diagrams/adapter.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'target.dart',
          code: '''
abstract class Target {
  Future<List<User>> request();
}
''',
        ),
        CodeSnippet(
          title: 'adaptee.dart',
          code: '''
class Adaptee {
  Future<String> specificRequest() async {
    return 'id,name,email\n1,Juan Perez,juanperez@example.com...';
  }
}
''',
        ),
        CodeSnippet(
          title: 'adapter.dart',
          code: '''
class Adapter implements Target {
  final Adaptee adaptee;
  Adapter(this.adaptee);
  Future<List<User>> request() async {
    final csv = await adaptee.specificRequest();
    final lines = csv.trim().split(RegExp(r'\\r?\\n'));
    final rows = lines.skip(1).where((e) => e.trim().isNotEmpty);
    return rows.map((row) {
      final parts = row.split(',');
      return User(
        id: int.tryParse(parts[0]) ?? 0,
        name: parts.length > 1 ? parts[1].trim() : '',
        email: parts.length > 2 ? parts[2].trim() : '',
      );
    }).toList();
  }
}
''',
        ),
      ],
      playground: AdapterDemo(api: api, pageSize: 6),
      playgroundExplicacion:
          'Busca por id, nombre o email. Usa los controles de paginación para navegar. Los datos vienen del Adaptee (CSV) y el Adapter los transforma a objetos User, exponiéndolos vía Target.',
    );
  }
}
