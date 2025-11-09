import 'observer.dart';
import 'types.dart';

enum Direction { up, down, flat }

class TickerEntry {
  final double price;
  final DateTime ts;
  final Direction direction;
  TickerEntry({required this.price, required this.ts, required this.direction});
}

class TickerSnapshot implements Observer<Quote> {
  final Map<String, TickerEntry> data = {};

  @override
  void update(Quote q) {
    final prev = data[q.symbol];
    final dir = prev == null
        ? Direction.flat
        : q.price > prev.price
        ? Direction.up
        : q.price < prev.price
        ? Direction.down
        : Direction.flat;
    data[q.symbol] = TickerEntry(price: q.price, ts: q.ts, direction: dir);
  }
}
