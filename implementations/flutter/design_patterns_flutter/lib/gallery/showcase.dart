import 'package:design_patterns_flutter/registry/patterns.dart';
import 'package:flutter/material.dart';

const _categoryIcons = <String, IconData>{
  'Creational': Icons.build_circle_rounded,
  'Structural': Icons.account_tree_rounded,
  'Behavioral': Icons.psychology_alt_rounded,
};

class Showcase extends StatefulWidget {
  const Showcase({super.key});
  @override
  State<Showcase> createState() => _ShowcaseState();
}

class _ShowcaseState extends State<Showcase> {
  PatternEntry? selected;
  String query = '';

  @override
  Widget build(BuildContext context) {
    if (selected != null) {
      return Scaffold(
        appBar: AppBar(
          title: Text(selected!.name),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => setState(() => selected = null),
            tooltip: 'Back',
          ),
        ),
        body: Builder(builder: selected!.builder),
      );
    }

    final theme = Theme.of(context);
    final cs = theme.colorScheme;

    // Filter by query (name/category)
    final filtered = patterns.where((p) {
      if (query.trim().isEmpty) return true;
      final q = query.toLowerCase();
      return p.name.toLowerCase().contains(q) ||
          p.category.toLowerCase().contains(q);
    }).toList();

    // Group by category
    final Map<String, List<PatternEntry>> grouped = {};
    for (final p in filtered) {
      grouped.putIfAbsent(p.category, () => []).add(p);
    }

    // Optional: show in canonical order
    const order = ['Creational', 'Structural', 'Behavioral'];
    final categories = [
      ...order.where(grouped.keys.toSet().contains),
      ...grouped.keys.where((k) => !order.contains(k)),
    ];

    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          // Stylish header
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [cs.primaryContainer, cs.secondaryContainer],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Icon(
                  Icons.layers_rounded,
                  size: 36,
                  color: cs.onPrimaryContainer,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Pattrones de diseño en Flutter',
                        style: theme.textTheme.titleLarge?.copyWith(
                          color: cs.onPrimaryContainer,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Search
          TextField(
            onChanged: (v) => setState(() => query = v),
            decoration: InputDecoration(
              hintText: 'Buscar patrones…',
              prefixIcon: const Icon(Icons.search),
              filled: true,
              fillColor: cs.surfaceVariant.withOpacity(0.5),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide(color: cs.outlineVariant),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide(color: cs.outlineVariant),
              ),
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 12,
                vertical: 12,
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Grouped sections
          ...categories.map((cat) {
            final items = grouped[cat]!
              ..sort((a, b) => a.name.compareTo(b.name));
            final icon = _categoryIcons[cat] ?? Icons.category_rounded;

            return Card(
              clipBehavior: Clip.antiAlias,
              margin: const EdgeInsets.only(bottom: 12),
              elevation: 1.5,
              child: Theme(
                // Make expansion tiles prettier (denser, without splashy highlights)
                data: theme.copyWith(dividerColor: Colors.transparent),
                child: ExpansionTile(
                  maintainState: true,
                  leading: CircleAvatar(
                    backgroundColor: cs.primaryContainer,
                    foregroundColor: cs.onPrimaryContainer,
                    child: Icon(icon),
                  ),
                  title: Text(
                    cat,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  subtitle: Text(
                    '${items.length} pattern${items.length == 1 ? '' : 's'}',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: cs.onSurfaceVariant,
                    ),
                  ),
                  childrenPadding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
                  children: [
                    ...items.map(
                      (p) => Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: ListTile(
                          shape: RoundedRectangleBorder(
                            side: BorderSide(color: cs.outlineVariant),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          leading: Icon(
                            Icons.description_rounded,
                            color: cs.primary,
                          ),
                          title: Text(
                            p.name,
                            style: const TextStyle(fontWeight: FontWeight.w600),
                          ),
                          trailing: const Icon(Icons.chevron_right_rounded),
                          onTap: () => setState(() => selected = p),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
          if (filtered.isEmpty)
            Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Text(
                  'No patterns found',
                  style: theme.textTheme.bodyMedium,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
