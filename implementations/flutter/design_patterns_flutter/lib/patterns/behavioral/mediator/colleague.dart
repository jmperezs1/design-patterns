import 'mediator.dart';

abstract class Colleague {
  late Mediator m;
  void setMediator(Mediator mediator) {
    m = mediator;
  }
}
