import 'colleague.dart';
import 'concrete_colleague_a.dart';
import 'concrete_colleague_b.dart';
import 'concrete_colleague_c.dart';
import 'concrete_colleague_d.dart';
import 'mediator.dart';
import 'types.dart';

class ConcreteMediator implements Mediator {
  final void Function(String line) onLog;
  final SearchBox A;
  final ResultsList B;
  final CategoryFilter C;
  final ClearButton D;
  final List<Item> dataset;

  ConcreteMediator(
    this.A,
    this.B,
    this.C,
    this.D,
    this.dataset, {
    void Function(String line)? onLog,
  }) : onLog = onLog ?? ((_) {}) {
    A.setMediator(this);
    B.setMediator(this);
    C.setMediator(this);
    D.setMediator(this);
  }

  @override
  void notify(Colleague sender, String event, [Object? payload]) {
    if (sender == A) {
      _reactOnA(event, payload as String? ?? '');
    } else if (sender == B) {
      _reactOnB(event, (payload as int?) ?? 0);
    } else if (sender == C) {
      _reactOnC(event, payload as String? ?? 'all');
    } else if (sender == D) {
      _reactOnD(event);
    }
  }

  void _reactOnA(String _, String q) {
    onLog('A → query="$q"');
    _refreshResults();
  }

  void _reactOnB(String _, int n) {
    onLog('B → rendered $n items');
  }

  void _reactOnC(String _, String cat) {
    onLog('C → category=$cat');
    _refreshResults();
  }

  void _reactOnD(String _) {
    onLog('D → clear all');
    A.value = '';
    C.value = 'all';
    _refreshResults();
  }

  void _refreshResults() {
    final q = A.value.trim().toLowerCase();
    final cat = C.value;
    final filtered = dataset
        .where(
          (it) =>
              (cat == 'all' || it.category == cat) &&
              (q.isEmpty || it.name.toLowerCase().contains(q)),
        )
        .toList(growable: false);
    B.operationB(filtered);
  }
}
