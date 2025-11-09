import 'visitor.dart';

abstract class Element {
  void accept(Visitor v);
}
