import 'package:flutter/material.dart';
import 'proxy.dart';
import 'product.dart';

class ProxyDemo extends StatefulWidget {
  const ProxyDemo({super.key});

  @override
  State<ProxyDemo> createState() => _ProxyDemoState();
}

class _ProxyDemoState extends State<ProxyDemo> {
  late final CachingProductProxy service;
  String id = '1';
  Product? product;
  List<String> logs = [];
  bool busy = false;
  Map<String, dynamic> stats = {};
  String? lastSource;

  @override
  void initState() {
    super.initState();
    service = CachingProductProxy();
    stats = service.getStats();
  }

  Future<void> load() async {
    try {
      setState(() {
        busy = true;
        logs.insert(0, 'Buscando producto $id…');
      });
      final prev = Map<String, dynamic>.from(service.getStats());
      final start = DateTime.now();
      final p = await service.getProduct(id);
      final ms = DateTime.now().difference(start).inMilliseconds;
      setState(() {
        product = p;
        stats = service.getStats();
        final fromNetwork = stats['networkCalls'] > prev['networkCalls'];
        lastSource = fromNetwork ? 'network' : 'cache';
        logs.insert(
          0,
          '✓ ${p.name} (${ms} ms, ${fromNetwork ? 'red' : 'caché'})',
        );
      });
    } catch (e) {
      setState(() {
        logs.insert(0, '✗ Error al cargar: $e');
      });
    } finally {
      setState(() {
        busy = false;
      });
    }
  }

  Future<void> burst() async {
    try {
      setState(() {
        busy = true;
        logs.insert(
          0,
          'Ráfaga x5 para id=$id (solicitudes simultáneas compartidas)',
        );
      });
      final prev = Map<String, dynamic>.from(service.getStats());
      final start = DateTime.now();
      await Future.wait(List.generate(5, (_) => service.getProduct(id)));
      final ms = DateTime.now().difference(start).inMilliseconds;
      setState(() {
        stats = service.getStats();
        final addedNetwork = stats['networkCalls'] - prev['networkCalls'];
        final agrupadas = (5 - addedNetwork).clamp(0, 5);
        logs.insert(
          0,
          '✓ Ráfaga resuelta en ${ms} ms (red +${addedNetwork}, caché/compartidas ${agrupadas})',
        );
      });
    } catch (e) {
      setState(() {
        logs.insert(0, '✗ Error en ráfaga: $e');
      });
    } finally {
      setState(() {
        busy = false;
      });
    }
  }

  void clearCache() {
    service.clearCache();
    setState(() {
      stats = service.getStats();
      logs.insert(0, 'Cache limpiada');
      lastSource = null;
    });
  }

  void quick(String v) {
    setState(() {
      id = v;
      logs.insert(0, 'ID seleccionado: $v');
    });
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    // Controls card
    final controls = Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: cs.outlineVariant),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Patrón Proxy: Servicio de Productos',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Caché + evita solicitudes duplicadas simultáneas',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: cs.surfaceVariant,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Text('Estructural'),
                ),
              ],
            ),

            const SizedBox(height: 8),

            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                SizedBox(
                  width: 220,
                  child: TextField(
                    controller: TextEditingController(text: id),
                    onChanged: (v) => id = v,
                    decoration: const InputDecoration(
                      labelText: 'ID de producto (1–100)',
                    ),
                  ),
                ),
                ElevatedButton(
                  onPressed: busy ? null : load,
                  child: Text(busy ? 'Cargando…' : 'Cargar'),
                ),
                ElevatedButton(
                  onPressed: busy ? null : burst,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: cs.primary.withOpacity(.9),
                  ),
                  child: const Text('Ráfaga x5'),
                ),
                OutlinedButton(
                  onPressed: busy ? null : clearCache,
                  child: const Text('Limpiar caché'),
                ),
                Row(
                  children: [
                    for (final q in ['1', '2', '3', '42', '99'])
                      Padding(
                        padding: const EdgeInsets.only(left: 8.0),
                        child: ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: id == q
                                ? cs.primary
                                : cs.surfaceVariant,
                          ),
                          onPressed: () => quick(q),
                          child: Text(q),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );

    // Stats cards (simple wrap)
    final statCards = Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        _statCard('Cache hits', stats['cacheHits'] ?? 0),
        _statCard('Cache misses', stats['cacheMisses'] ?? 0),
        _statCard('Llamadas de red', stats['networkCalls'] ?? 0),
        _statCard('Tamaño de caché', stats['cacheSize'] ?? 0),
        _statCard('En vuelo', stats['inflight'] ?? 0),
      ],
    );

    final resultCard = Card(
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Resultado',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                if (lastSource != null)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 8,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: lastSource == 'network'
                          ? cs.primary.withOpacity(.12)
                          : cs.surfaceVariant,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      'Origen: ${lastSource == 'network' ? 'red' : 'caché'}',
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            if (product != null)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'ID: ${product!.id}',
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  Text('Nombre: ${product!.name}'),
                  Text('Precio: \$${product!.price.toStringAsFixed(2)}'),
                ],
              )
            else
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Sin producto cargado. Ingresa un ID y presiona "Cargar".',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ),
          ],
        ),
      ),
    );

    final logCard = Card(
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Registro',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                TextButton(
                  onPressed: () => setState(() => logs.clear()),
                  child: const Text('Limpiar log'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Container(
              height: 220,
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                border: Border.all(color: cs.outlineVariant),
                borderRadius: BorderRadius.circular(8),
              ),
              child: logs.isEmpty
                  ? Text(
                      'Aún no hay registros',
                      style: Theme.of(context).textTheme.bodySmall,
                    )
                  : SingleChildScrollView(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: logs.map((l) => Text(l)).toList(),
                      ),
                    ),
            ),
          ],
        ),
      ),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        controls,
        const SizedBox(height: 12),
        statCards,
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(child: resultCard),
            const SizedBox(width: 12),
            Expanded(child: logCard),
          ],
        ),
      ],
    );
  }

  Widget _statCard(String label, Object value) {
    return Card(
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              style: TextStyle(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              '$value',
              style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18),
            ),
          ],
        ),
      ),
    );
  }
}
