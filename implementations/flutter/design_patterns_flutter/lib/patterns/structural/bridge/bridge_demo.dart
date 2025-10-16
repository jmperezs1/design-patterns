import 'package:flutter/material.dart';

import 'abstraction.dart';
import 'implementor.dart';
import 'inventory_report.dart';
import 'order_report.dart';

class BridgeDemo extends StatefulWidget {
  const BridgeDemo({super.key});

  @override
  State<BridgeDemo> createState() => _BridgeDemoState();
}

class _BridgeDemoState extends State<BridgeDemo> {
  String reportKind = 'orders'; // orders | inventory
  String exporterKind = 'csv';   // csv | json
  String output = '';

  late List<Order> _sampleOrders;
  late List<Product> _sampleProducts;

  @override
  void initState() {
    super.initState();
    _sampleOrders = const [
      Order(id: 'O-1001', customer: 'Ada Lovelace', total: 120.5, status: 'paid'),
      Order(id: 'O-1002', customer: 'Linus Torvalds', total: 89.0, status: 'pending'),
    ];
    _sampleProducts = const [
      Product(sku: 'KB-01', name: 'Keyboard', stock: 3, min: 5),
      Product(sku: 'MN-27', name: '27” Monitor', stock: 12, min: 4),
    ];
  }

  Exporter _makeExporter() => exporterKind == 'json' ? JsonExporter() : CsvExporter();

  Report _makeReport(Exporter e) => reportKind == 'orders'
      ? OrdersReport(e, _sampleOrders)
      : InventoryReport(e, _sampleProducts);

  Future<void> _onExport() async {
    final exporter = _makeExporter();
    final report = _makeReport(exporter);
    final res = await report.generateReport();
    setState(() => output = res.text);
    // Note: file download omitted (web-only); we just preview content here.
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      constraints: const BoxConstraints(maxWidth: 900),
      margin: const EdgeInsets.symmetric(horizontal: 8),
      child: Card(
        clipBehavior: Clip.antiAlias,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Bridge Pattern: Reportes × Exportadores',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
              const SizedBox(height: 12),
              Wrap(
                spacing: 12,
                runSpacing: 8,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  Row(mainAxisSize: MainAxisSize.min, children: [
                    const Text('Reporte'),
                    const SizedBox(width: 8),
                    DropdownButton<String>(
                      value: reportKind,
                      items: const [
                        DropdownMenuItem(value: 'orders', child: Text('Órdenes')),
                        DropdownMenuItem(value: 'inventory', child: Text('Inventario')),
                      ],
                      onChanged: (v) => setState(() => reportKind = v ?? 'orders'),
                    ),
                  ]),
                  Row(mainAxisSize: MainAxisSize.min, children: [
                    const Text('Exportador'),
                    const SizedBox(width: 8),
                    DropdownButton<String>(
                      value: exporterKind,
                      items: const [
                        DropdownMenuItem(value: 'csv', child: Text('CSV')),
                        DropdownMenuItem(value: 'json', child: Text('JSON')),
                      ],
                      onChanged: (v) => setState(() => exporterKind = v ?? 'csv'),
                    ),
                  ]),
                  ElevatedButton.icon(
                    onPressed: _onExport,
                    icon: const Icon(Icons.download),
                    label: const Text('Exportar'),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Divider(color: cs.outlineVariant),
              const SizedBox(height: 12),
              Text('Vista previa', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant)),
              const SizedBox(height: 8),
              Container(
                height: 280,
                decoration: BoxDecoration(
                  border: Border.all(color: cs.outlineVariant),
                  borderRadius: BorderRadius.circular(8),
                  color: cs.surfaceVariant.withOpacity(.25),
                ),
                padding: const EdgeInsets.all(12),
                child: SingleChildScrollView(
                  child: SelectableText(output.isEmpty ? '—' : output,
                      style: const TextStyle(fontFamily: 'monospace')),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
