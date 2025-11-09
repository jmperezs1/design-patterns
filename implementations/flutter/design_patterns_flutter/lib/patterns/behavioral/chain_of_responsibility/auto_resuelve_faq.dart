import 'handler.dart';
import 'types.dart';

class AutoResuelveFAQ extends Handler {
  @override
  HandleResult handle(Ticket req, {List<String>? trail}) {
    final t = trail ?? <String>[];
    push(t);
    if (req.category == Category.billing && req.severity == Severity.low) {
      return HandleResult(
        handledBy: 'AutoResuelveFAQ',
        message:
            'Resuelto automáticamente con enlace a las FAQ de Facturación.',
        trail: t,
      );
    }
    return super.handle(req, trail: t);
  }
}
