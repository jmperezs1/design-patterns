import 'package:design_patterns_flutter/patterns/behavioral/state/context.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/progress_state.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/state.dart';

class NewState extends TicketState {
  final TicketContext ctx;
  NewState(this.ctx);

  @override
  void handleRequest() {
    ctx.commitDraft();
    ctx.setState(InProgressState(ctx));
  }
}
