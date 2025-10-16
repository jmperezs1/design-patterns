import 'package:design_patterns_flutter/patterns/behavioral/command/command.dart';

class Invoker {
  Command command;
  Invoker(this.command);

  void setCommand(Command c) {
    command = c;
  }

  void executeCommand([String? item]) {
    command.execute(item);
  }
}
