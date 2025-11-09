abstract class IteratorIface<T> {
  bool hasNext();
  T next();
  void remove();
  void reset();
}
