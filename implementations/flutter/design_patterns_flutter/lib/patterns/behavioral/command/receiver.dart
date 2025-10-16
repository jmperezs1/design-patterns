class Receiver {
  final Map<String, int> _items = {};

  void addItem(String item) {
    _items[item] = (_items[item] ?? 0) + 1;
  }

  void removeItem(String item) {
    final cur = _items[item] ?? 0;
    if (cur <= 1) {
      _items.remove(item);
    } else {
      _items[item] = cur - 1;
    }
  }

  void clearItems() {
    _items.clear();
  }

  // helpers
  List<MapEntry<String, int>> list() => _items.entries.toList();
  int count(String item) => _items[item] ?? 0;
  int size() => _items.length;
}
