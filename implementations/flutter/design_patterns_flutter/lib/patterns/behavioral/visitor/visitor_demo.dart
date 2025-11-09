import 'package:flutter/material.dart';
import 'element_book.dart' as eb;
import 'element_electronics.dart' as ee;
import 'element_grocery.dart' as eg;
import 'element.dart' as el;
import 'visitor_total_price.dart';
import 'visitor_delivery.dart';
import 'visitor_csv.dart';

class VisitorDemo extends StatefulWidget {
  const VisitorDemo({super.key});

  @override
  State<VisitorDemo> createState() => _VisitorDemoState();
}

class _VisitorDemoState extends State<VisitorDemo> {
  final List<el.Element> items = [
    eb.Book('Patrones de Diseño', 30, 1, false),
    ee.Electronics('Teclado', 80, 1, true),
    eg.Grocery('Café en grano', 12, 2, true),
  ];

  String kind = 'book';
  String name = 'Nuevo ítem';
  String price = '10';
  String qty = '1';
  bool flag = true;

  Map<String, double>? totals;
  double? shipping;
  String csv = '';

  void addItem() {
    final p = double.tryParse(price) ?? 0.0;
    final q = (int.tryParse(qty) ?? 1).clamp(1, 9999);
  el.Element it;
  if (kind == 'book') it = eb.Book(name, p, q, flag);
  else if (kind == 'electronics') it = ee.Electronics(name, p, q, flag);
  else it = eg.Grocery(name, p, q, flag);
    setState(() => items.add(it));
  }

  void removeAt(int idx) => setState(() => items.removeAt(idx));

  void calcTotals() {
  final v = TotalPriceVisitor();
  for (final elItem in items) elItem.accept(v);
    setState(() => totals = {'subtotal': v.subtotal, 'tax': v.tax, 'total': v.total});
  }

  void calcShipping() {
  final v = ShippingEstimatorVisitor();
  for (final elItem in items) elItem.accept(v);
    setState(() => shipping = v.shipping);
  }

  void exportCsv() {
  final v = CsvExportVisitor();
  for (final elItem in items) elItem.accept(v);
    setState(() => csv = v.toString());
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: cs.outlineVariant)),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Visitor: Carrito con Operaciones', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
              const SizedBox(height: 6),
              Text('Aplica distintos visitantes (totales, envío, exportación) sin modificar los elementos.', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant)),
              const SizedBox(height: 12),
              LayoutBuilder(builder: (context, c) {
                final twoCols = c.maxWidth > 860;
                final controls = Column(children: [
                  Row(children: [
                    DropdownButton<String>(value: kind, items: const [DropdownMenuItem(value: 'book', child: Text('Libro')), DropdownMenuItem(value: 'electronics', child: Text('Electrónica')), DropdownMenuItem(value: 'grocery', child: Text('Alimento'))], onChanged: (v) => setState(() => kind = v ?? kind)),
                    const SizedBox(width: 12),
                    Expanded(child: TextField(decoration: const InputDecoration(labelText: 'Nombre/Título'), onChanged: (v) => name = v, controller: TextEditingController(text: name))),
                    const SizedBox(width: 12),
                    SizedBox(width: 100, child: TextField(decoration: const InputDecoration(labelText: 'Precio'), keyboardType: TextInputType.number, onChanged: (v) => price = v, controller: TextEditingController(text: price))),
                    const SizedBox(width: 12),
                    SizedBox(width: 80, child: TextField(decoration: const InputDecoration(labelText: 'Cantidad'), keyboardType: TextInputType.number, onChanged: (v) => qty = v, controller: TextEditingController(text: qty))),
                    const SizedBox(width: 12),
                    Column(children: [Checkbox(value: flag, onChanged: (v) => setState(() => flag = v ?? flag)), Text(kind == 'book' ? 'Importado' : kind == 'electronics' ? 'Frágil' : 'Perecedero')])
                  ]),
                  const SizedBox(height: 8),
                  Align(alignment: Alignment.centerLeft, child: ElevatedButton.icon(onPressed: addItem, icon: const Icon(Icons.add), label: const Text('Agregar'))),
                ]);
                return twoCols ? Row(children: [Expanded(child: controls)]) : controls;
              })
            ]),
          ),
        ),
        const SizedBox(height: 16),
        LayoutBuilder(builder: (context, c) {
          final twoCols = c.maxWidth > 860;
          final itemsCard = Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: cs.outlineVariant)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Ítems', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                if (items.isNotEmpty)
                  Column(children: [for (var i = 0; i < items.length; i++) Padding(padding: const EdgeInsets.symmetric(vertical: 6), child: Row(children: [Expanded(child: _renderItem(items[i])), const SizedBox(width: 8), OutlinedButton(onPressed: () => removeAt(i), child: const Text('quitar'))]))])
                else
                  Text('Carrito vacío', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant))
              ]),
            ),
          );

          final opsCard = Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: cs.outlineVariant)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('Operaciones', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Wrap(spacing: 12, children: [ElevatedButton(onPressed: calcTotals, child: const Text('Calcular Totales')), OutlinedButton(onPressed: calcShipping, child: const Text('Estimar Envío')), OutlinedButton(onPressed: exportCsv, child: const Text('Exportar CSV'))]),
                const SizedBox(height: 12),
                if (totals != null) Container(width: double.infinity, padding: const EdgeInsets.all(8), decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), border: Border.all(color: cs.outlineVariant)), child: Text('Subtotal: \$${totals!['subtotal']!.toStringAsFixed(2)} · Impuestos: \$${totals!['tax']!.toStringAsFixed(2)} · Total: \$${totals!['total']!.toStringAsFixed(2)}')),
                if (shipping != null) Container(width: double.infinity, padding: const EdgeInsets.all(8), decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), border: Border.all(color: cs.outlineVariant)), child: Text('Envío estimado: \$${shipping!.toStringAsFixed(2)}')),
                if (csv.isNotEmpty) Container(width: double.infinity, padding: const EdgeInsets.all(8), decoration: BoxDecoration(borderRadius: BorderRadius.circular(8), border: Border.all(color: cs.outlineVariant)), child: SingleChildScrollView(scrollDirection: Axis.horizontal, child: Text(csv))),
              ]),
            ),
          );

          if (twoCols) return Row(children: [Expanded(child: itemsCard), const SizedBox(width: 16), Expanded(child: opsCard)]);
          return Column(children: [itemsCard, const SizedBox(height: 12), opsCard]);
        }),
      ],
    );
  }

  Widget _renderItem(el.Element it) {
    if (it is eb.Book) return Text('📘 Libro: ${it.title} · \$${it.unitPrice} × ${it.qty} · ${it.isImported ? "Importado" : "Nacional"}');
    if (it is ee.Electronics) return Text('🔌 Electrónica: ${it.name} · \$${it.unitPrice} × ${it.qty} · ${it.fragile ? "Frágil" : "Normal"}');
    if (it is eg.Grocery) return Text('🥫 Alimento: ${it.name} · \$${it.unitPrice} × ${it.qty} · ${it.perishable ? "Perecedero" : "No perecedero"}');
    return const Text('Ítem');
  }
}
