import 'dart:async';
import 'dart:math';

import 'observer.dart';
import 'subject.dart';
import 'types.dart';

class MarketDataHub implements Subject<Quote> {
  final _observers = <Observer<Quote>>{};
  Timer? _timer;
  final _rand = Random();

  @override
  void addObserver(Observer<Quote> o) {
    _observers.add(o);
  }

  @override
  void removeObserver(Observer<Quote> o) {
    _observers.remove(o);
  }

  @override
  void notifyObservers(Quote d) {
    for (final o in _observers) {
      o.update(d);
    }
  }

  void start([List<String> symbols = defaultSymbols]) {
    _timer ??= Timer.periodic(const Duration(milliseconds: 600), (_) {
      final s = symbols[_rand.nextInt(symbols.length)];
      final price = double.parse(
        (50 + _rand.nextDouble() * 400).toStringAsFixed(2),
      );
      notifyObservers(Quote(symbol: s, price: price, ts: DateTime.now()));
    });
  }

  void stop() {
    _timer?.cancel();
    _timer = null;
  }
}
