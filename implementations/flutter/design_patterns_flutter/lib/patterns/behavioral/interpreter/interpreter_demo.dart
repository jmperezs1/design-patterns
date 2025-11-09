import 'package:flutter/material.dart';
import 'parser.dart';

class InterpreterDemo extends StatefulWidget {
  const InterpreterDemo({super.key});
  @override
  State<InterpreterDemo> createState() => _InterpreterDemoState();
}

class _InterpreterDemoState extends State<InterpreterDemo> {
  final _controller = TextEditingController(text: '3 + 5 * 2');
  String? _rpn;
  int? _result;
  String? _error;

  final _examples = const [
    '3 + 5 * 2',
    '(3 + 5) * 2',
    '8 * (2 + 2) + 1',
    '10 + 2 * (3 + 7)',
  ];

  void _evalNow() {
    try {
      final parsed = parseToExpression(_controller.text);
      setState(() {
        _rpn = parsed.rpn;
        _result = parsed.expr.interpret();
        _error = null;
      });
    } catch (e) {
      setState(() {
        _rpn = null;
        _result = null;
        _error = e.toString();
      });
    }
  }

  void _setExample(String s) {
    setState(() {
      _controller.text = s;
      _rpn = null;
      _result = null;
      _error = null;
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
                  'Interpreter: Mini calculadora aritmética',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Construye un AST (suma y multiplicación) y evalúa con interpret().',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        decoration: const InputDecoration(
                          labelText: 'Expresión (usa +, *, paréntesis)',
                        ),
                      ),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton.icon(
                      onPressed: _evalNow,
                      icon: const Icon(Icons.auto_awesome),
                      label: const Text('Evaluar'),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(child: _buildResult(cs)),
            const SizedBox(width: 16),
            Expanded(child: _buildExamples(cs)),
          ],
        ),
      ],
    );
  }

  Widget _buildResult(ColorScheme cs) {
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
              'Resultado',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            if (_error != null)
              Row(
                children: [
                  const Icon(Icons.error_outline, color: Colors.red),
                  const SizedBox(width: 8),
                  Expanded(child: Text(_error!)),
                ],
              )
            else if (_result != null)
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: cs.outlineVariant),
                ),
                child: Text(
                  '$_result',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              )
            else
              Text(
                'Evalúa una expresión para ver el resultado',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              ),
            if (_rpn != null) ...[
              const SizedBox(height: 8),
              Text('RPN: $_rpn', style: Theme.of(context).textTheme.bodySmall),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildExamples(ColorScheme cs) {
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
              'Ejemplos',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final ex in _examples)
                  OutlinedButton.icon(
                    onPressed: () => _setExample(ex),
                    icon: const Icon(Icons.refresh),
                    label: Text(ex),
                  ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: cs.surfaceVariant.withOpacity(.35),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: cs.outlineVariant),
              ),
              child: Text(
                'Soporta dígitos, suma (+), multiplicación (*) y paréntesis. Precedencia: * sobre +.',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
