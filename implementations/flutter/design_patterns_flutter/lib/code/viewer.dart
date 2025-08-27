import 'package:flutter/material.dart';
import 'package:code_text_field/code_text_field.dart';
import 'package:flutter_highlight/themes/atom-one-dark.dart';
import 'package:highlight/languages/dart.dart' as lang_dart;
import 'package:flutter_highlight/flutter_highlight.dart';
import 'package:design_patterns_flutter/registry/patterns.dart';

class DartCodeBlock extends StatefulWidget {
  final CodeSnippet snippet;
  final bool readOnly;
  final double height;

  const DartCodeBlock({
    super.key,
    required this.snippet,
    this.readOnly = true,
    this.height = 320,
  });

  @override
  State<DartCodeBlock> createState() => _DartCodeBlockState();
}

class _DartCodeBlockState extends State<DartCodeBlock> {
  late CodeController _controller;

  @override
  void initState() {
    super.initState();
    _controller = CodeController(
      text: widget.snippet.code,
      language: lang_dart.dart,
    );
  }

  @override
  void didUpdateWidget(covariant DartCodeBlock oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.snippet.code != widget.snippet.code) {
      _controller.text = widget.snippet.code;
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    final codeTheme = atomOneDarkTheme; // o;r any light theme

    return Card(
      margin: const EdgeInsets.only(top: 12),
      clipBehavior: Clip.antiAlias,
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          title: Text(
            widget.snippet.title,
            style: const TextStyle(fontWeight: FontWeight.w600),
          ),
          subtitle: Text('Dart', style: TextStyle(color: cs.onSurfaceVariant)),
          childrenPadding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
          children: [
            HighlightView(
              widget.snippet.code, // your Dart code string
              language: 'dart',
              theme: codeTheme,
              padding: const EdgeInsets.all(12),
              textStyle: const TextStyle(fontFamily: 'monospace', fontSize: 14),
            ),
          ],
        ),
      ),
    );
  }
}
