import 'package:flutter/material.dart';
import 'constants/add_on.dart';
import 'plain_burger.dart';
import 'burger.dart';

class DecoratorDemo extends StatefulWidget {
  const DecoratorDemo({super.key});

  @override
  State<DecoratorDemo> createState() => _DecoratorDemoState();
}

class _DecoratorDemoState extends State<DecoratorDemo> {
  final List<String> _selected = [];

  void _toggle(String key) {
    setState(() {
      if (_selected.contains(key)) {
        _selected.remove(key);
      } else {
        _selected.add(key);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    // Build final burger and breakdown
    Burger b = PlainBurger();
    final rows = <Map<String, dynamic>>[];
    double prev = b.getCost();
    for (final k in _selected) {
      final meta = ADDONS[k];
      if (meta == null) continue;
      b = meta.build(b);
      final cur = b.getCost();
      rows.add({'label': meta.label, 'delta': cur - prev, 'subtotal': cur});
      prev = cur;
    }
    final total = b.getCost();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(color: cs.outlineVariant),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Decorator: Hamburguesa', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Text('Cada add-on es un decorador que envuelve la hamburguesa y ajusta descripción y costo.', style: Theme.of(context).textTheme.bodySmall),
                const SizedBox(height: 12),
                ...ADDONS.entries.map((e) {
                  final k = e.key;
                  return CheckboxListTile(
                    value: _selected.contains(k),
                    onChanged: (_) => _toggle(k),
                    title: Text(e.value.label),
                    controlAffinity: ListTileControlAffinity.leading,
                  );
                }).toList(),
              ],
            ),
          ),
        ),

        const SizedBox(height: 16),

        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(color: cs.outlineVariant),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Pedido', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Text(b.getDescription()),
                const SizedBox(height: 12),

                Table(
                  columnWidths: const {
                    0: FlexColumnWidth(3),
                    1: FlexColumnWidth(1),
                    2: FlexColumnWidth(1),
                  },
                  children: [
                    TableRow(children: [
                      Padding(padding: const EdgeInsets.all(6), child: Text('Decorador aplicado (en orden)', style: TextStyle(fontWeight: FontWeight.bold))),
                      Padding(padding: const EdgeInsets.all(6), child: Text('Δ Precio', textAlign: TextAlign.right, style: TextStyle(fontWeight: FontWeight.bold))),
                      Padding(padding: const EdgeInsets.all(6), child: Text('Subtotal', textAlign: TextAlign.right, style: TextStyle(fontWeight: FontWeight.bold))),
                    ]),
                    TableRow(children: [
                      Padding(padding: const EdgeInsets.all(6), child: Text('Base: Hamburguesa sencilla', style: TextStyle(color: cs.onSurfaceVariant))),
                      Padding(padding: const EdgeInsets.all(6), child: Text('—', textAlign: TextAlign.right, style: TextStyle(color: cs.onSurfaceVariant))),
                      Padding(padding: const EdgeInsets.all(6), child: Text('\$${PlainBurger().getCost().toStringAsFixed(2)}', textAlign: TextAlign.right)),
                    ]),
                    if (rows.isEmpty)
                      TableRow(children: [
                        Padding(padding: const EdgeInsets.all(6), child: Text('Sin decoradores seleccionados', style: TextStyle(color: cs.onSurfaceVariant))),
                        const SizedBox(),
                        const SizedBox(),
                      ])
                    else ...rows.map((r) => TableRow(children: [
                      Padding(padding: const EdgeInsets.all(6), child: Text(r['label'] as String)),
                      Padding(padding: const EdgeInsets.all(6), child: Text('+\$${(r['delta'] as double).toStringAsFixed(2)}', textAlign: TextAlign.right)),
                      Padding(padding: const EdgeInsets.all(6), child: Text('\$${(r['subtotal'] as double).toStringAsFixed(2)}', textAlign: TextAlign.right)),
                    ])).toList(),
                    TableRow(children: [
                      const SizedBox(),
                      Padding(padding: const EdgeInsets.all(6), child: Text('Total', textAlign: TextAlign.right, style: TextStyle(fontWeight: FontWeight.bold))),
                      Padding(padding: const EdgeInsets.all(6), child: Text('\$${total.toStringAsFixed(2)}', textAlign: TextAlign.right, style: TextStyle(fontWeight: FontWeight.bold))),
                    ]),
                  ],
                ),

                const SizedBox(height: 12),
                Align(
                  alignment: Alignment.centerRight,
                  child: OutlinedButton(onPressed: () => setState(() => _selected.clear()), child: const Text('Limpiar')),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
