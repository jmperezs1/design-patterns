import 'package:flutter/material.dart';
import 'flyweight_factory.dart';
import 'helpers/make_data.dart';

class FlyweightDemo extends StatefulWidget {
  const FlyweightDemo({super.key});

  @override
  State<FlyweightDemo> createState() => _FlyweightDemoState();
}

class _FlyweightDemoState extends State<FlyweightDemo> {
  int _count = 2500;
  late final BadgeFactory _factory;

  @override
  void initState() {
    super.initState();
    _factory = BadgeFactory();
  }

  @override
  Widget build(BuildContext context) {
    final items = makeData(_count);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Theme.of(context).colorScheme.outlineVariant)),
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Text('Flyweight: Pool de Badges', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
                Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Theme.of(context).colorScheme.surfaceVariant, borderRadius: BorderRadius.circular(8)), child: Text('Estructural')),
              ]),
              const SizedBox(height: 8),
              Text('Renderizamos ${_count.toString()} badges pero sólo creamos ${_factory.size()} flyweights compartidos. El estado intrínseco (forma, padding, borde) se comparte; los datos extrínsecos (texto, color, x/y) se pasan en cada operación.'),
              const SizedBox(height: 12),
              Row(children: [
                SizedBox(width: 140, child: TextField(key: const ValueKey('count'), keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Cantidad de badges'), controller: TextEditingController(text: '2500'), onSubmitted: (v) => setState(() => _count = int.tryParse(v) ?? _count))),
                const SizedBox(width: 12),
                ElevatedButton(onPressed: () => setState(() => _count = 500), child: const Text('500')),
                const SizedBox(width: 8),
                ElevatedButton(onPressed: () => setState(() => _count = 2500), child: const Text('2500')),
                const SizedBox(width: 8),
                ElevatedButton(onPressed: () => setState(() => _count = 5000), child: const Text('5000')),
              ]),
            ]),
          ),
        ),

        const SizedBox(height: 12),

        Card(
          elevation: 0,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: BorderSide(color: Theme.of(context).colorScheme.outlineVariant)),
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Container(
                height: 420,
                decoration: BoxDecoration(border: Border.all(color: Theme.of(context).colorScheme.outlineVariant), borderRadius: BorderRadius.circular(8), color: Colors.white),
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: SizedBox(
                    width: 1000,
                    child: Stack(children: items.map((it) => _factory.get(it.variant).operation(text: it.text, x: it.x, y: it.y, color: it.color)).toList()),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text('Flyweights en caché: ${_factory.size()}'), Text('Items: ${items.length.toString()}')]),
            ]),
          ),
        ),
      ],
    );
  }
}
