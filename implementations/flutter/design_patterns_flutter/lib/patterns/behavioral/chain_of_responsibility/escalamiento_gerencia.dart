import 'handler.dart';
import 'types.dart';

class EscalamientoGerencia extends Handler {
  @override
  HandleResult handle(Ticket req, {List<String>? trail}) {
    final t = trail ?? <String>[];
    push(t);
    return HandleResult(
      handledBy: 'EscalamientoGerencia',
      message: 'Escalado al Gerente de Guardia.',
      trail: t,
    );
  }
}
