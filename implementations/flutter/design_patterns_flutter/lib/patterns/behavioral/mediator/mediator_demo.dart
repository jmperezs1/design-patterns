import 'package:flutter/material.dart';
import 'concrete_colleague_a.dart';
import 'concrete_colleague_b.dart';
import 'concrete_colleague_c.dart';
import 'concrete_colleague_d.dart';
import 'concrete_mediator.dart';
import 'types.dart';

class MediatorDemo extends StatefulWidget {
  const MediatorDemo({super.key});
  @override
  State<MediatorDemo> createState() => _MediatorDemoState();
}

class _MediatorDemoState extends State<MediatorDemo> {
  late final SearchBox A;
  late final ResultsList B;
  late final CategoryFilter Cc;
  late final ClearButton D;
  late final ConcreteMediator mediator;

  final List<String> logs = [];
  late final List<Item> dataset;

  String query = '';
  String category = 'all';

  @override
  void initState() {
    super.initState();
    A = SearchBox();
    B = ResultsList();
    Cc = CategoryFilter();
    D = ClearButton();
    dataset = makeDataset();
    mediator = ConcreteMediator(
      A,
      B,
      Cc,
      D,
      dataset,
      onLog: (l) => setState(() {
        logs.insert(0, l);
      }),
    );
    // initial refresh
    Cc.operationC('all');
    A.operationA('');
    query = A.value;
    category = Cc.value;
  }

  void _onQueryChanged(String v) {
    setState(() {
      query = v;
      A.operationA(v);
    });
  }

  void _onCategoryChanged(String? v) {
    if (v == null) return;
    setState(() {
      category = v;
      Cc.operationC(v);
    });
  }

  void _clearAll() {
    D.operationD();
    setState(() {
      query = A.value;
      category = Cc.value;
    });
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
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
                Text(
                  'Mediator: Buscador con Filtro',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Los componentes no se conocen entre sí; se comunican a través del mediador.',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: [
                    SizedBox(
                      width: 320,
                      child: TextField(
                        decoration: const InputDecoration(labelText: 'Buscar'),
                        controller: TextEditingController(text: query)
                          ..selection = TextSelection.collapsed(
                            offset: query.length,
                          ),
                        onChanged: _onQueryChanged,
                      ),
                    ),
                    SizedBox(
                      width: 220,
                      child: DropdownButtonFormField<String>(
                        decoration: const InputDecoration(
                          labelText: 'Categoría',
                        ),
                        value: category,
                        items: const [
                          DropdownMenuItem(value: 'all', child: Text('Todas')),
                          DropdownMenuItem(
                            value: 'books',
                            child: Text('Libros'),
                          ),
                          DropdownMenuItem(
                            value: 'tech',
                            child: Text('Tecnología'),
                          ),
                          DropdownMenuItem(value: 'home', child: Text('Hogar')),
                        ],
                        onChanged: _onCategoryChanged,
                      ),
                    ),
                    OutlinedButton.icon(
                      onPressed: _clearAll,
                      icon: const Icon(Icons.clear),
                      label: const Text('Limpiar'),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    _chip('${B.view.length} resultados', cs),
                    _chip(
                      'Categoría: ${category == 'all' ? 'Todas' : category}',
                      cs,
                    ),
                    _chip('Query: ${query.isEmpty ? '(vacía)' : query}', cs),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, c) {
            final twoCols = c.maxWidth > 760;
            final results = _buildResults(cs);
            final log = _buildLog(cs);
            if (twoCols) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: results),
                  const SizedBox(width: 16),
                  Expanded(child: log),
                ],
              );
            }
            return Column(children: [results, const SizedBox(height: 16), log]);
          },
        ),
      ],
    );
  }

  Widget _chip(String text, ColorScheme cs) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: cs.surfaceVariant.withOpacity(.35),
        border: Border.all(color: cs.outlineVariant),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Text(
        text,
        style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
      ),
    );
  }

  Widget _buildResults(ColorScheme cs) {
    return Card(
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
            Text(
              'Resultados',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            if (B.view.isEmpty)
              Text(
                'No hay resultados. Ajusta la búsqueda o cambia la categoría.',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (final it in B.view)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          it.name,
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                      ),
                      _chip(it.category, cs),
                    ],
                  ),
                ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildLog(ColorScheme cs) {
    return Card(
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
            Text(
              'Registro del Mediador',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            if (logs.isEmpty)
              Text(
                'Interactúa con los controles para ver eventos.',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (final l in logs.take(50))
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Text('• $l'),
                ),
            ],
          ],
        ),
      ),
    );
  }
}
