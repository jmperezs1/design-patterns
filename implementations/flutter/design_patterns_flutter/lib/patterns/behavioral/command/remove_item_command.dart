import 'package:design_patterns_flutter/patterns/behavioral/command/command.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/receiver.dart';

class RemoveItemCommand implements Command {
  final Receiver device;
  RemoveItemCommand(this.device);

  @override
  void execute([String? item]) {
    if (item != null && item.isNotEmpty) {
      device.removeItem(item);
    }
  }
}
