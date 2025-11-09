import 'observer.dart';
import 'types.dart';

class ThresholdAlert implements Observer<Quote> {
  final List<String> logs = [];
  String _targetSymbol;
  double _above;
  ThresholdAlert(this._targetSymbol, this._above);

  void setTargetSymbol(String s) {
    _targetSymbol = s;
  }

  void setAbove(double n) {
    _above = n;
  }

  @override
  void update(Quote q) {
    if (q.symbol == _targetSymbol && q.price >= _above) {
      logs.insert(
        0,
        '[${q.ts.toLocal().toIso8601String().substring(11, 19)}] ${q.symbol} ≥ $_above → ${q.price.toStringAsFixed(2)}',
      );
      if (logs.length > 60) logs.removeLast();
    }
  }
}
