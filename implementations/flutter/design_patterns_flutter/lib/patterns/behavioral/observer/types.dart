class Quote {
  final String symbol;
  final double price;
  final DateTime ts;
  Quote({required this.symbol, required this.price, DateTime? ts})
    : ts = ts ?? DateTime.now();
}

const defaultSymbols = ['AAPL', 'MSFT', 'NVDA', 'BTC-USD'];
