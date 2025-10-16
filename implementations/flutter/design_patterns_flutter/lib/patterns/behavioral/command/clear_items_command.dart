import 'package:design_patterns_flutter/patterns/behavioral/command/command.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/receiver.dart';

class ClearItemsCommand implements Command {
  final Receiver device;
  ClearItemsCommand(this.device);

  @override
  void execute([String? item]) {
    device.clearItems();
  }
}
