import 'package:design_patterns_flutter/patterns/behavioral/command/add_item_command.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/clear_items_command.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/data/catalog.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/invoker.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/receiver.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/remove_item_command.dart';
import 'package:flutter/material.dart';

class CommandDemo extends StatefulWidget {
  const CommandDemo({super.key});

  @override
  State<CommandDemo> createState() => _CommandDemoState();
}

class _CommandDemoState extends State<CommandDemo> {
  late final Receiver device;
  late final AddItemCommand add;
  late final RemoveItemCommand remove;
  late final ClearItemsCommand clear;
  late final Invoker invoker;

  int v = 0; // simple counter to show rerenders if needed

  @override
  void initState() {
    super.initState();
    device = Receiver();
    add = AddItemCommand(device);
    remove = RemoveItemCommand(device);
    clear = ClearItemsCommand(device);
    invoker = Invoker(add);
  }

  void doAdd(String name) {
    invoker.setCommand(add);
    invoker.executeCommand(name);
    setState(() => v++);
  }

  void doRemove(String name) {
    invoker.setCommand(remove);
    invoker.executeCommand(name);
    setState(() => v++);
  }

  void doClear() {
    invoker.setCommand(clear);
    invoker.executeCommand();
    setState(() => v++);
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final rows = device.list();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final name in catalog)
              OutlinedButton(
                onPressed: () => doAdd(name),
                child: Text('+ $name'),
              ),
          ],
        ),
        const SizedBox(height: 12),
        LayoutBuilder(
          builder: (context, c) {
            final narrow = c.maxWidth < 420;
            final title = Text(
              'Command Pattern: Ítems',
              style: Theme.of(
                context,
              ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.bold),
            );
            final controls = Wrap(
              spacing: 8,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: cs.secondaryContainer,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text('${device.size()} tipo(s)'),
                ),
                OutlinedButton(
                  onPressed: rows.isEmpty ? null : doClear,
                  style: OutlinedButton.styleFrom(foregroundColor: Colors.red),
                  child: const Text('Limpiar todo'),
                ),
              ],
            );

            if (narrow) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [title, const SizedBox(height: 8), controls],
              );
            }
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(child: title),
                controls,
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
              0: FlexColumnWidth(2),
              1: FlexColumnWidth(1),
              2: FlexColumnWidth(2),
            },
            defaultVerticalAlignment: TableCellVerticalAlignment.middle,
            children: [
              TableRow(
                decoration: BoxDecoration(color: cs.surfaceVariant),
                children: const [
                  Padding(padding: EdgeInsets.all(8), child: Text('Ítem')),
                  Padding(
                    padding: EdgeInsets.all(8),
                    child: Text('Cant.', textAlign: TextAlign.center),
                  ),
                  Padding(
                    padding: EdgeInsets.all(8),
                    child: Text('Acciones', textAlign: TextAlign.right),
                  ),
                ],
              ),
              if (rows.isEmpty)
                const TableRow(
                  children: [
                    Padding(
                      padding: EdgeInsets.all(8),
                      child: Text(
                        'Aún no hay ítems. Usa los botones de arriba para agregar.',
                        style: TextStyle(color: Colors.grey),
                      ),
                    ),
                    SizedBox.shrink(),
                    SizedBox.shrink(),
                  ],
                ),
              ...rows.map((e) {
                final name = e.key;
                final qty = e.value;
                return TableRow(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8),
                      child: Text(name),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8),
                      child: Text('$qty', textAlign: TextAlign.center),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          IconButton(
                            onPressed: qty <= 0 ? null : () => doRemove(name),
                            icon: const Icon(Icons.remove_circle_outline),
                          ),
                          IconButton(
                            onPressed: () => doAdd(name),
                            icon: const Icon(Icons.add_circle_outline),
                          ),
                        ],
                      ),
                    ),
                  ],
                );
              }),
            ],
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Render v$v',
          style: const TextStyle(color: Colors.grey, fontSize: 12),
        ),
      ],
    );
  }
}
