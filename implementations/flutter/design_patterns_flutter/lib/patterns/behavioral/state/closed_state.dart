import 'package:design_patterns_flutter/patterns/behavioral/state/context.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/state.dart';

class ClosedState extends TicketState {
  final TicketContext ctx;
  ClosedState(this.ctx);

  @override
  void handleRequest() {
    if (!ctx.allDone()) {
      final remain = ctx.tasks
          .where((t) => !t.done)
          .map((t) => t.title)
          .join(', ');
      throw Exception(
        'Cannot close. Remaining tasks: ${remain.isEmpty ? 'unknown' : remain}',
      );
    }
    ctx.closedAt ??= DateTime.now();
  }
}
