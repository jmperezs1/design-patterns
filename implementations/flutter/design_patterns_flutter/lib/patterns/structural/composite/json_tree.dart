import 'package:flutter/material.dart';
import 'component.dart';
import 'package:flutter/services.dart';
import 'helpers/node_builder.dart';
import 'types/json.dart';

class JsonTreeRadix extends StatelessWidget {
  final Json data;
  final String rootLabel;

  const JsonTreeRadix({super.key, required this.data, this.rootLabel = 'root'});

  @override
  Widget build(BuildContext context) {
    final root = buildNode(rootLabel, data);
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Text('JSON Composite', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
              Chip(label: Text('Flutter')),
            ]),
            const SizedBox(height: 8),
            const Divider(),
            TreeNode(node: root, path: rootLabel, depth: 0),
          ]),
        ),
      ),
    );
  }
}

class TreeNode extends StatefulWidget {
  final JsonComponent node;
  final String path;
  final int depth;

  const TreeNode({super.key, required this.node, required this.path, required this.depth});

  @override
  State<TreeNode> createState() => _TreeNodeState();
}

class _TreeNodeState extends State<TreeNode> {
  bool open = true;

  @override
  Widget build(BuildContext context) {
    final node = widget.node;
    final hasChildren = !node.isLeaf();
    final padding = 8.0 + widget.depth * 14.0;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
        padding: EdgeInsets.only(left: padding, top: 6, bottom: 6, right: 6),
        child: Row(children: [
          IconButton(icon: Icon(hasChildren ? (open ? Icons.expand_more : Icons.chevron_right) : Icons.circle, size: 18), onPressed: hasChildren ? () => setState(() => open = !open) : null),
          Text(widget.node.keyLabel, style: const TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(width: 6),
          const Text(':', style: TextStyle(color: Colors.grey)),
          const SizedBox(width: 6),
          Expanded(child: SelectableText(node.getPreview(), style: const TextStyle(fontFamily: 'monospace'))),
          IconButton(onPressed: () async { await Clipboard.setData(ClipboardData(text: widget.path)); ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Path copied'))); }, icon: const Icon(Icons.copy, size: 18)),
        ]),
      ),
      if (hasChildren && open)
        Padding(
          padding: EdgeInsets.only(left: 16.0),
          child: Column(children: [
            for (final c in node.getChildren())
                 TreeNode(
                   node: c,
                   depth: widget.depth + 1,
                  path: RegExp(r'^\d+$').hasMatch(c.keyLabel) ? '${widget.path}[${c.keyLabel}]' : '${widget.path}.${c.keyLabel}',
              ),
          ]),
        ),
    ]);
  }
}
