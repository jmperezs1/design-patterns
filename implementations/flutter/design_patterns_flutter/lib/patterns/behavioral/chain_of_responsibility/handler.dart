import 'types.dart';

abstract class Handler {
  Handler? _next;

  Handler setNext(Handler h) {
    _next = h;
    return h;
  }

  HandleResult handle(Ticket req, {List<String>? trail}) {
    trail ??= <String>[];
    if (_next != null) return _next!.handle(req, trail: trail);
    return HandleResult(
      handledBy: 'Sin asignar',
      message: 'Escalado fuera de la cadena',
      trail: trail,
    );
  }

  void push(List<String> trail) => trail.add(runtimeType.toString());
}
