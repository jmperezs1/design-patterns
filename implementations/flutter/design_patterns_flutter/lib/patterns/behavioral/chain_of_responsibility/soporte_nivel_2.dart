import 'handler.dart';
import 'types.dart';

class SoporteNivel2 extends Handler {
  @override
  HandleResult handle(Ticket req, {List<String>? trail}) {
    final t = trail ?? <String>[];
    push(t);
    if (req.category == Category.technical &&
        severityRank(req.severity) >= severityRank(Severity.medium)) {
      return HandleResult(
        handledBy: 'SoporteNivel2',
        message: 'Asignado a ingeniero de Nivel 2.',
        trail: t,
      );
    }
    return super.handle(req, trail: t);
  }
}
