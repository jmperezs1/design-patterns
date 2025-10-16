import 'package:design_patterns_flutter/patterns/behavioral/state/closed_state.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/context.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/new_state.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/progress_state.dart';
import 'package:flutter/material.dart';

class TicketDemo extends StatefulWidget {
  const TicketDemo({super.key});

  @override
  State<TicketDemo> createState() => _TicketDemoState();
}

class _TicketDemoState extends State<TicketDemo> {
  late final TicketContext ticket;
  int renderTick = 0;

  final TextEditingController _title = TextEditingController();
  final TextEditingController _task = TextEditingController();
  final List<String> _staged = [];
  String? errorMsg;

  @override
  void initState() {
    super.initState();
    ticket = TicketContext();
  }

  @override
  void dispose() {
    _title.dispose();
    _task.dispose();
    super.dispose();
  }

  bool get isNew => ticket.state is NewState;
  bool get isInProgress => ticket.state is InProgressState;
  bool get isClosed => ticket.state is ClosedState;
  String get stateName => isNew
      ? 'Nuevo'
      : isInProgress
      ? 'En progreso'
      : isClosed
      ? 'Cerrado'
      : 'Desconocido';

  void _addTask() {
    final t = _task.text.trim();
    if (t.isEmpty) return;
    setState(() {
      _staged.add(t);
      _task.clear();
    });
  }

  void _removeTask(int index) {
    setState(() {
      _staged.removeAt(index);
    });
  }

  void _handleRequest() {
    setState(() => errorMsg = null);
    try {
      if (isNew) {
        ticket.draftTitle = _title.text;
        ticket.draftTasks = List.of(_staged);
      }
      ticket.request();
      if (!isNew) {
        _title.clear();
        _task.clear();
        _staged.clear();
      }
    } catch (e) {
      setState(() => errorMsg = e.toString().replaceFirst('Exception: ', ''));
    }
    setState(() => renderTick++);
  }

  void _reset() {
    setState(() {
      ticket.reset();
      _title.clear();
      _task.clear();
      _staged.clear();
      errorMsg = null;
      renderTick++;
    });
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final doneCount = ticket.tasks.where((t) => t.done).length;
    final total = ticket.tasks.length;
    final progress = total > 0 ? ((doneCount / total) * 100).round() : 0;

    final handleLabel = isNew
        ? 'Handle → Confirmar título y tareas'
        : isInProgress
        ? 'Handle → Marcar siguiente tarea'
        : 'Handle → Validar y cerrar ticket';

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Ticket de soporte',
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: cs.secondaryContainer,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(stateName),
            ),
          ],
        ),
        if (errorMsg != null) ...[
          const SizedBox(height: 8),
          Text(errorMsg!, style: const TextStyle(color: Colors.red)),
        ],
        const SizedBox(height: 8),
        if (isNew) ...[
          Text(
            'Prepara el ticket y presiona Handle para confirmarlo e iniciar.',
            style: Theme.of(
              context,
            ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
          ),
          const SizedBox(height: 8),
          LayoutBuilder(
            builder: (context, c) {
              final twoCols = c.maxWidth > 560;
              final titleField = TextField(
                controller: _title,
                decoration: const InputDecoration(hintText: 'Título'),
              );
              final taskRow = Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _task,
                      decoration: const InputDecoration(
                        hintText: 'Agregar tarea',
                      ),
                      onSubmitted: (_) => _addTask(),
                    ),
                  ),
                  const SizedBox(width: 8),
                  OutlinedButton(
                    onPressed: _addTask,
                    child: const Text('Agregar'),
                  ),
                ],
              );
              return twoCols
                  ? Row(
                      children: [
                        Expanded(child: titleField),
                        const SizedBox(width: 8),
                        Expanded(child: taskRow),
                      ],
                    )
                  : Column(
                      children: [
                        titleField,
                        const SizedBox(height: 8),
                        taskRow,
                      ],
                    );
            },
          ),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: cs.outlineVariant),
              borderRadius: BorderRadius.circular(8),
            ),
            clipBehavior: Clip.antiAlias,
            child: Table(
              columnWidths: const {
                0: FixedColumnWidth(36),
                1: FlexColumnWidth(),
                2: FixedColumnWidth(60),
              },
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              children: [
                TableRow(
                  decoration: BoxDecoration(color: cs.surfaceVariant),
                  children: const [
                    Padding(padding: EdgeInsets.all(8), child: Text('#')),
                    Padding(
                      padding: EdgeInsets.all(8),
                      child: Text('Tarea planificada'),
                    ),
                    Padding(
                      padding: EdgeInsets.all(8),
                      child: Text('Acciones', textAlign: TextAlign.right),
                    ),
                  ],
                ),
                if (_staged.isEmpty)
                  const TableRow(
                    children: [
                      SizedBox.shrink(),
                      Padding(
                        padding: EdgeInsets.all(8),
                        child: Text(
                          'Aún no hay tareas',
                          style: TextStyle(color: Colors.grey),
                        ),
                      ),
                      SizedBox.shrink(),
                    ],
                  )
                else
                  ..._staged.asMap().entries.map((e) {
                    final i = e.key;
                    final t = e.value;
                    return TableRow(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8),
                          child: Text('${i + 1}'),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8),
                          child: Text(t),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8),
                          child: Align(
                            alignment: Alignment.centerRight,
                            child: IconButton(
                              onPressed: () => _removeTask(i),
                              tooltip: 'Quitar',
                              color: Colors.red,
                              icon: const Icon(Icons.delete_outline),
                            ),
                          ),
                        ),
                      ],
                    );
                  }),
              ],
            ),
          ),
        ] else ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                ticket.title,
                style: Theme.of(
                  context,
                ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.bold),
              ),
              Text(
                '$doneCount/$total tareas completadas ($progress%)',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: cs.outlineVariant),
              borderRadius: BorderRadius.circular(8),
            ),
            clipBehavior: Clip.antiAlias,
            child: Table(
              columnWidths: const {
                0: FixedColumnWidth(36),
                1: FlexColumnWidth(),
                2: FixedColumnWidth(60),
              },
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              children: [
                TableRow(
                  decoration: BoxDecoration(color: cs.surfaceVariant),
                  children: const [
                    Padding(padding: EdgeInsets.all(8), child: Text('#')),
                    Padding(padding: EdgeInsets.all(8), child: Text('Tarea')),
                    Padding(
                      padding: EdgeInsets.all(8),
                      child: Text('Hecho', textAlign: TextAlign.center),
                    ),
                  ],
                ),
                ...ticket.tasks.asMap().entries.map((e) {
                  final i = e.key;
                  final t = e.value;
                  return TableRow(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8),
                        child: Text('${i + 1}'),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8),
                        child: Text(t.title),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8),
                        child: Text(
                          t.done ? '✅' : '—',
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ],
                  );
                }),
              ],
            ),
          ),
          if (ticket.closedAt != null)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                'Cerrado: ${ticket.closedAt}',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              ),
            ),
        ],
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            ElevatedButton(onPressed: _handleRequest, child: Text(handleLabel)),
            OutlinedButton(
              onPressed: isNew ? null : _reset,
              child: const Text('Reset → Nuevo'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Text(
          'Render v$renderTick',
          style: const TextStyle(color: Colors.grey, fontSize: 12),
        ),
      ],
    );
  }
}
