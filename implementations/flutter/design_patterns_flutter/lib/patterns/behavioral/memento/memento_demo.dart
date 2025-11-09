import 'package:flutter/material.dart';
import 'originator.dart';
import 'caretaker.dart';

class MementoDemo extends StatefulWidget {
  const MementoDemo({super.key});
  @override
  State<MementoDemo> createState() => _MementoDemoState();
}

class _MementoDemoState extends State<MementoDemo> {
  late final EditorOriginator originator;
  late final EditorCaretaker caretaker;
  final List<String> logs = [];

  String text = '';
  List<Map<String, Object>> history = [];

  @override
  void initState() {
    super.initState();
    originator = EditorOriginator();
    caretaker = EditorCaretaker(originator);
    history = caretaker.history();
    text = originator.getText();
  }

  void _onTextChanged(String v) {
    originator.setText(v);
    setState(() {
      text = v;
    });
  }

  void _checkpoint() {
    caretaker.checkpoint('Manual');
    setState(() {
      history = caretaker.history();
    });
    _log(
      'Checkpoint guardado (${DateTime.now().toLocal().toIso8601String().substring(11, 19)})',
    );
  }

  void _undo() {
    caretaker.undo();
    setState(() {
      text = originator.getText();
      history = caretaker.history();
    });
    _log('Deshacer → estado restaurado');
  }

  void _redo() {
    caretaker.redo();
    setState(() {
      text = originator.getText();
      history = caretaker.history();
    });
    _log('Rehacer → estado restaurado');
  }

  void _preset(String p) {
    originator.setText(p);
    setState(() {
      text = p;
    });
  }

  void _log(String msg) {
    setState(() {
      logs.insert(0, msg);
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
                  'Memento: Editor con Deshacer/Rehacer',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Guarda snapshots del estado y los restaura sin exponer detalles internos.',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 12),
                TextField(
                  maxLines: 10,
                  decoration: const InputDecoration(
                    labelText: 'Contenido',
                    border: OutlineInputBorder(),
                  ),
                  controller: TextEditingController(text: text)
                    ..selection = TextSelection.collapsed(offset: text.length),
                  onChanged: _onTextChanged,
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 10,
                  runSpacing: 8,
                  children: [
                    ElevatedButton.icon(
                      onPressed: _checkpoint,
                      icon: const Icon(Icons.bookmark),
                      label: const Text('Guardar checkpoint'),
                    ),
                    OutlinedButton.icon(
                      onPressed: caretaker.canUndo() ? _undo : null,
                      icon: const Icon(Icons.undo),
                      label: const Text('Deshacer'),
                    ),
                    OutlinedButton.icon(
                      onPressed: caretaker.canRedo() ? _redo : null,
                      icon: const Icon(Icons.redo),
                      label: const Text('Rehacer'),
                    ),
                    OutlinedButton(
                      onPressed: () => _preset('Hola mundo'),
                      child: const Text('Preset: Hola mundo'),
                    ),
                    OutlinedButton(
                      onPressed: () => _preset('Patrones de diseño en acción'),
                      child: const Text('Preset: Patrones'),
                    ),
                    OutlinedButton(
                      onPressed: () => _preset(''),
                      child: const Text('Vaciar'),
                    ),
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
            final hist = _buildHistory(cs);
            final log = _buildLog(cs);
            if (twoCols) {
              return Row(
                children: [
                  Expanded(child: hist),
                  const SizedBox(width: 16),
                  Expanded(child: log),
                ],
              );
            }
            return Column(children: [hist, const SizedBox(height: 16), log]);
          },
        ),
      ],
    );
  }

  Widget _buildHistory(ColorScheme cs) {
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
              'Historial',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            if (history.isEmpty)
              Text(
                'Sin checkpoints',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (var i = 0; i < history.length; i++)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Text(
                    '#${i + 1} • ${(history[i]['createdAt'] as DateTime).toLocal().toIso8601String().substring(11, 19)} — ${(history[i]['text'] as String).substring(0, (history[i]['text'] as String).length.clamp(0, 32))}',
                    style: TextStyle(
                      color: i == history.length - 1
                          ? cs.primary
                          : cs.onSurfaceVariant,
                    ),
                  ),
                ),
            ],
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: cs.surfaceVariant.withOpacity(.3),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: cs.outlineVariant),
              ),
              padding: const EdgeInsets.all(12),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Icon(Icons.info_outline, size: 18, color: cs.primary),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Deshacer retrocede al snapshot anterior. Rehacer avanza si antes deshiciste. Guardar checkpoint limpia el historial de rehacer.',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: cs.onSurfaceVariant,
                      ),
                    ),
                  ),
                ],
              ),
            ),
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
              'Registro',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 8),
            if (logs.isEmpty)
              Text(
                'Aún no hay acciones registradas.',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (final l in logs.take(60))
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
