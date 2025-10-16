import 'dart:async';

import 'package:flutter/material.dart';

import 'domain/user.dart';
import 'target.dart';

class AdapterDemo extends StatefulWidget {
  final Target api;
  final int pageSize;
  const AdapterDemo({super.key, required this.api, this.pageSize = 10});

  @override
  State<AdapterDemo> createState() => _AdapterDemoState();
}

class _AdapterDemoState extends State<AdapterDemo> {
  List<User> _rows = const [];
  bool _loading = true;
  Object? _error;
  String _q = '';
  int _page = 1;
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    _fetch();
  }

  Future<void> _fetch() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final data = await widget.api.request();
      if (!mounted) return;
      setState(() {
        _rows = data;
      });
    } catch (e) {
      if (!mounted) return;
      setState(() => _error = e);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  List<User> get _filtered {
    final s = _q.trim().toLowerCase();
    if (s.isEmpty) return _rows;
    return _rows.where((u) {
      return u.id.toString().contains(s) ||
          u.name.toLowerCase().contains(s) ||
          u.email.toLowerCase().contains(s);
    }).toList();
  }

  int get _totalPages => (_filtered.isEmpty)
      ? 1
      : ((_filtered.length + widget.pageSize - 1) ~/ widget.pageSize);

  int get _pageSafe => _page.clamp(1, _totalPages);

  List<User> get _pageRows {
    final start = ( _pageSafe - 1) * widget.pageSize;
    final end = (start + widget.pageSize).clamp(0, _filtered.length);
    return _filtered.sublist(start, end);
  }

  void _onQueryChanged(String v) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 120), () {
      setState(() {
        _q = v;
        _page = 1;
      });
    });
  }

  @override
  void dispose() {
    _debounce?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cs.outlineVariant),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            alignment: WrapAlignment.spaceBetween,
            runSpacing: 8,
            children: [
              SizedBox(
                width: 360,
                child: TextField(
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.search),
                    hintText: 'Buscar id, nombre, email…',
                  ),
                  onChanged: _onQueryChanged,
                ),
              ),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(_loading
                      ? 'Cargando…'
                      : '${_filtered.length} resultado(s)'),
                  const SizedBox(width: 12),
                  IconButton(
                    tooltip: 'Anterior',
                    onPressed: _loading || _pageSafe == 1
                        ? null
                        : () => setState(() => _page = _pageSafe - 1),
                    icon: const Icon(Icons.chevron_left),
                  ),
                  Text('Página $_pageSafe / $_totalPages'),
                  IconButton(
                    tooltip: 'Siguiente',
                    onPressed: _loading || _pageSafe == _totalPages
                        ? null
                        : () => setState(() => _page = _pageSafe + 1),
                    icon: const Icon(Icons.chevron_right),
                  ),
                ],
              )
            ],
          ),
          const SizedBox(height: 8),
          Divider(color: cs.outlineVariant),
          const SizedBox(height: 8),

          // Table header
          _HeaderRow(cs: cs),
          const SizedBox(height: 4),

          if (_loading)
            Column(
              children: List.generate(
                6,
                (i) => const _DataRowSkeleton(),
              ),
            )
          else if (_pageRows.isEmpty)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 24),
              child: Center(
                child: Text(
                  'Sin resultados',
                  style: TextStyle(color: cs.onSurfaceVariant),
                ),
              ),
            )
          else
            Column(
              children: _pageRows
                  .map((u) => _DataRow(
                        id: u.id,
                        name: u.name,
                        email: u.email,
                      ))
                  .toList(),
            ),

          if (_error != null)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text('Error: $_error', style: TextStyle(color: cs.error)),
            ),
        ],
      ),
    );
  }
}

class _HeaderRow extends StatelessWidget {
  const _HeaderRow({required this.cs});
  final ColorScheme cs;
  @override
  Widget build(BuildContext context) {
    final style = Theme.of(context).textTheme.labelLarge;
    return Container(
      decoration: BoxDecoration(
        color: cs.surfaceVariant.withOpacity(.35),
        borderRadius: BorderRadius.circular(8),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          SizedBox(width: 120, child: Text('ID', style: style)),
          const SizedBox(width: 12),
          Expanded(child: Text('Nombre', style: style)),
          const SizedBox(width: 12),
          Expanded(child: Text('Email', style: style)),
        ],
      ),
    );
  }
}

class _DataRowSkeleton extends StatelessWidget {
  const _DataRowSkeleton();
  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    Widget box(double w) => Container(
          height: 18,
          width: w,
          decoration: BoxDecoration(
            color: cs.surfaceVariant.withOpacity(.6),
            borderRadius: BorderRadius.circular(4),
          ),
        );
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          SizedBox(width: 120, child: box(60)),
          const SizedBox(width: 12),
          Expanded(child: box(140)),
          const SizedBox(width: 12),
          Expanded(child: box(200)),
        ],
      ),
    );
  }
}

class _DataRow extends StatelessWidget {
  final int id;
  final String name;
  final String email;
  const _DataRow({required this.id, required this.name, required this.email});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      child: Row(
        children: [
          SizedBox(width: 120, child: Text('$id')),
          const SizedBox(width: 12),
          Expanded(child: Text(name, style: const TextStyle(fontWeight: FontWeight.w600))),
          const SizedBox(width: 12),
          Expanded(child: Text(email)),
        ],
      ),
    );
  }
}
