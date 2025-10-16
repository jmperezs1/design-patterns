import 'package:design_patterns_flutter/patterns/behavioral/command/command.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/receiver.dart';

class AddItemCommand implements Command {
  final Receiver device;
  AddItemCommand(this.device);

  @override
  void execute([String? item]) {
    if (item != null && item.isNotEmpty) {
      device.addItem(item);
    }
  }
}
