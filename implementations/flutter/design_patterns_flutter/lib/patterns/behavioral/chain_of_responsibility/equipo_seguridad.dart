import 'handler.dart';
import 'types.dart';

class EquipoSeguridad extends Handler {
  @override
  HandleResult handle(Ticket req, {List<String>? trail}) {
    final t = trail ?? <String>[];
    push(t);
    if (req.category == Category.security) {
      return HandleResult(
        handledBy: 'EquipoSeguridad',
        message: 'Derivado a Seguridad (SLA 1h).',
        trail: t,
      );
    }
    return super.handle(req, trail: t);
  }
}
