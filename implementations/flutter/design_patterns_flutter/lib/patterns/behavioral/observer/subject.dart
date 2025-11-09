import 'observer.dart';

abstract class Subject<T> {
  void addObserver(Observer<T> o);
  void removeObserver(Observer<T> o);
  void notifyObservers(T data);
}
