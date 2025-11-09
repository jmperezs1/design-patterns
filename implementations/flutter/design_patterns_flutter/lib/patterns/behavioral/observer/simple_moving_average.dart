import 'observer.dart';
import 'types.dart';

class SimpleMovingAverage implements Observer<Quote> {
  String _symbol;
  int _window;
  final List<double> _values = [];
  double average = 0;

  SimpleMovingAverage(this._symbol, [int window = 5])
    : _window = window < 1 ? 1 : window;

  void setSymbol(String s) {
    _symbol = s;
    _values.clear();
    average = 0;
  }

  void setWindow(int n) {
    _window = n < 1 ? 1 : n;
    _values.clear();
    average = 0;
  }

  @override
  void update(Quote q) {
    if (q.symbol != _symbol) return;
    _values.add(q.price);
    if (_values.length > _window) _values.removeAt(0);
    final sum = _values.fold<double>(0, (a, b) => a + b);
    average = double.parse((sum / _values.length).toStringAsFixed(2));
  }
}
