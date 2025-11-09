import 'colleague.dart';

abstract class Mediator {
  void notify(Colleague sender, String event, [Object? payload]);
}
