import 'package:design_patterns_flutter/patterns/behavioral/state/closed_state.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/context.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/state.dart';

class InProgressState extends TicketState {
  final TicketContext ctx;
  InProgressState(this.ctx);

  @override
  void handleRequest() {
    final task = ctx.checkNextTask();
    if (task != null) {
      if (ctx.allDone()) {
        ctx.setState(ClosedState(ctx));
      }
    } else {
      ctx.setState(ClosedState(ctx));
    }
  }
}
