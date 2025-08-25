import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:design_patterns_flutter/registry/patterns.dart';

class CodeBlock extends StatelessWidget {
  final CodeSnippet snippet;
  const CodeBlock({super.key, required this.snippet});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Card(
      margin: const EdgeInsets.only(top: 12),
      clipBehavior: Clip.antiAlias,
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          title: Text(
            snippet.title,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
          subtitle: Text(
            snippet.language,
            style: TextStyle(color: cs.onSurfaceVariant),
          ),
          childrenPadding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
          children: [
            Container(
              decoration: BoxDecoration(
                color: cs.surfaceVariant.withOpacity(.5),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: cs.outlineVariant),
              ),
              padding: const EdgeInsets.fromLTRB(12, 12, 8, 8),
              child: Stack(
                children: [
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: SelectableText(
                      snippet.code,
                      style: const TextStyle(
                        fontFamily: 'monospace',
                        fontSize: 12.5,
                        height: 1.35,
                      ),
                    ),
                  ),
                  Positioned(
                    right: 0,
                    top: -4,
                    child: IconButton(
                      tooltip: 'Copiar',
                      icon: const Icon(Icons.copy_rounded, size: 18),
                      onPressed: () async {
                        await Clipboard.setData(
                          ClipboardData(text: snippet.code),
                        );
                        if (context.mounted) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Código copiado')),
                          );
                        }
                      },
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
}
