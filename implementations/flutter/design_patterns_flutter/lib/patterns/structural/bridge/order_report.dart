import 'abstraction.dart';
import 'domain/report_data.dart';

class Order {
  final String id;
  final String customer;
  final double total;
  final String status;
  const Order({required this.id, required this.customer, required this.total, required this.status});
}

class OrdersReport extends Report {
  final List<Order> orders;
  OrdersReport(super.exporter, this.orders);

  @override
  Future<ReportData> build() async {
    final rows = orders
        .map((o) => {
              'id': o.id,
              'customer': o.customer,
              'total': o.total,
              'status': o.status,
            })
        .toList();
    return ReportData(title: 'Orders Report', rows: rows);
  }
}
