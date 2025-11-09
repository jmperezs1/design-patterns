import 'iterator.dart';

abstract class Aggregate<T> {
  IteratorIface<T> createIterator();
}
