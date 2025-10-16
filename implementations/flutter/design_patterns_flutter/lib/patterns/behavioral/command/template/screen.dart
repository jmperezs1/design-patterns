import 'package:design_patterns_flutter/code/snippet.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/command_demo.dart';
import 'package:design_patterns_flutter/patterns/common/pattern_scaffold.dart';
import 'package:flutter/material.dart';

class CommandScreen extends StatelessWidget {
  const CommandScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return PatternTemplate(
      heading: 'Command',
      badge: 'Behavioral',
      resumen:
          'Command encapsula una petición como un objeto, permitiendo parametrizar invocaciones, hacer cola de operaciones y soportar deshacer/rehacer. Desacopla al emisor (invoker) del receptor real.',
      problematicaGeneral:
          'Cuando la UI dispara acciones sobre un receptor concreto, el acoplamiento crece y se complica sustituir comportamientos, programar acciones o mantener historial.',
      solucionGeneral:
          'Definir una interfaz Command con execute() y crear comandos concretos que deleguen en un receptor. Un Invoker mantiene y ejecuta el comando actual, intercambiándolo según la operación.',
      casoEspecifico:
          'Lista de ítems donde podemos agregar, quitar y limpiar todo. La UI no conoce la estructura interna del receptor: sólo selecciona y ejecuta comandos.',
      solucionEspecifica:
          'AddItemCommand, RemoveItemCommand y ClearItemsCommand operan sobre un Receiver que gestiona el inventario. Un Invoker selecciona el comando apropiado antes de ejecutarlo.',
      diagramaSolucionGeneralAssetPath: 'assets/diagrams/real_command.png',
      diagramaSolucionEspecificaAssetPath: 'assets/diagrams/command.png',
      codeSnippets: const [
        CodeSnippet(
          title: 'command.dart',
          code: '''
abstract class Command {
  void execute([String? item]);
}
''',
        ),
        CodeSnippet(
          title: 'receiver.dart',
          code: '''
class Receiver {
  final Map<String, int> _items = {};
  void addItem(String item) { _items[item] = (_items[item] ?? 0) + 1; }
  void removeItem(String item) {
    final cur = _items[item] ?? 0;
    if (cur <= 1) { _items.remove(item); } else { _items[item] = cur - 1; }
  }
  void clearItems() { _items.clear(); }
  List<MapEntry<String, int>> list() => _items.entries.toList();
  int count(String item) => _items[item] ?? 0;
  int size() => _items.length;
}
''',
        ),
        CodeSnippet(
          title: 'add_item_command.dart',
          code: '''
class AddItemCommand implements Command {
  final Receiver device; AddItemCommand(this.device);
  void execute([String? item]) { if (item != null && item.isNotEmpty) device.addItem(item); }
}
''',
        ),
        CodeSnippet(
          title: 'remove_item_command.dart',
          code: '''
class RemoveItemCommand implements Command {
  final Receiver device; RemoveItemCommand(this.device);
  void execute([String? item]) { if (item != null && item.isNotEmpty) device.removeItem(item); }
}
''',
        ),
        CodeSnippet(
          title: 'clear_items_command.dart',
          code: '''
class ClearItemsCommand implements Command {
  final Receiver device; ClearItemsCommand(this.device);
  void execute([String? item]) { device.clearItems(); }
}
''',
        ),
        CodeSnippet(
          title: 'invoker.dart',
          code: '''
class Invoker {
  Command command; Invoker(this.command);
  void setCommand(Command c) { command = c; }
  void executeCommand([String? item]) { command.execute(item); }
}
''',
        ),
      ],
      playground: const CommandDemo(),
      playgroundExplicacion:
          'Usa los botones del catálogo para ejecutar AddItemCommand. En la tabla, usa + o - para alternar entre Add y Remove. “Limpiar todo” ejecuta ClearItemsCommand. El Invoker decide qué comando correr en cada acción.',
    );
  }
}
