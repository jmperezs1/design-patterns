import 'package:design_patterns_flutter/patterns/behavioral/state/models/task.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/new_state.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/state.dart';

class TicketContext {
  late TicketState state;

  String title = '';
  List<Task> tasks = [];
  DateTime? closedAt;

  String draftTitle = '';
  List<String> draftTasks = [];

  TicketContext() {
    state = NewState(this);
  }

  void setState(TicketState s) {
    state = s;
  }

  void request() {
    state.handleRequest();
  }

  void commitDraft() {
    final t = draftTitle.trim();
    final list = draftTasks
        .map((s) => s.trim())
        .where((s) => s.isNotEmpty)
        .toList();
    if (t.isEmpty) throw Exception('Title is required');
    if (list.isEmpty) throw Exception('Add at least one task');
    title = t;
    tasks = [
      for (int i = 0; i < list.length; i++)
        Task(id: '${i + 1}', title: list[i]),
    ];
    closedAt = null;
  }

  Task? checkNextTask() {
    final next = tasks.firstWhere(
      (x) => !x.done,
      orElse: () => Task(id: '', title: '', done: true),
    );
    if (next.id.isEmpty) return null;
    next.done = true;
    return next;
  }

  bool allDone() => tasks.isNotEmpty && tasks.every((x) => x.done);

  void reset() {
    title = '';
    tasks = [];
    closedAt = null;
    draftTitle = '';
    draftTasks = [];
    setState(NewState(this));
  }
}
