import 'abstraction.dart';
import 'domain/report_data.dart';

class Product {
  final String sku;
  final String name;
  final int stock;
  final int min;
  const Product({
    required this.sku,
    required this.name,
    required this.stock,
    required this.min,
  });
}

class InventoryReport extends Report {
  final List<Product> items;
  InventoryReport(super.exporter, this.items);

  @override
  Future<ReportData> build() async {
    final rows = items
        .map(
          (p) => {
            'sku': p.sku,
            'name': p.name,
            'stock': p.stock,
            'min': p.min,
            'value': p.stock * p.min,
          },
        )
        .toList();
    return ReportData(title: 'Inventory Report', rows: rows);
  }
}
