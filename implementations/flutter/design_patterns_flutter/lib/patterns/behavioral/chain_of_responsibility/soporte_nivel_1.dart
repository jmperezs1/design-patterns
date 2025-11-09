import 'handler.dart';
import 'types.dart';

class SoporteNivel1 extends Handler {
  @override
  HandleResult handle(Ticket req, {List<String>? trail}) {
    final t = trail ?? <String>[];
    push(t);
    if (severityRank(req.severity) <= severityRank(Severity.medium)) {
      return HandleResult(
        handledBy: 'SoporteNivel1',
        message: 'Atendido por Soporte Nivel 1.',
        trail: t,
      );
    }
    return super.handle(req, trail: t);
  }
}
