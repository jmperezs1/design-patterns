import 'package:flutter/material.dart';
import 'types.dart';
import 'handler.dart';
import 'auto_resuelve_faq.dart';
import 'equipo_seguridad.dart';
import 'soporte_nivel_1.dart';
import 'soporte_nivel_2.dart';
import 'escalamiento_gerencia.dart';

Handler buildChain() {
  final h1 = AutoResuelveFAQ();
  final h2 = h1.setNext(EquipoSeguridad());
  final h3 = h2.setNext(SoporteNivel1());
  final h4 = h3.setNext(SoporteNivel2());
  h4.setNext(EscalamientoGerencia());
  return h1;
}

class ChainDemo extends StatefulWidget {
  const ChainDemo({super.key});
  @override
  State<ChainDemo> createState() => _ChainDemoState();
}

class _ChainDemoState extends State<ChainDemo> {
  late final Handler chain;
  String id = 'T-1001';
  Severity severity = Severity.low;
  Category category = Category.billing;
  String description = 'Consulta de facturación simple';
  HandleResult? result;
  final List<String> history = [];

  @override
  void initState() {
    super.initState();
    chain = buildChain();
  }

  void _run() {
    final ticket = Ticket(
      id: id,
      severity: severity,
      category: category,
      description: description,
    );
    final trail = <String>[];
    final out = chain.handle(ticket, trail: trail);
    setState(() {
      result = out;
      history.insert(
        0,
        '${DateTime.now().toIso8601String().substring(11, 19)} • ${ticket.id} → ${out.handledBy}',
      );
    });
  }

  void _resetForm() {
    setState(() {
      id = 'T-1001';
      severity = Severity.low;
      category = Category.billing;
      description = 'Consulta de facturación simple';
      result = null;
    });
  }

  void _preset(String kind) {
    setState(() {
      if (kind == 'faq') {
        id = 'T-2001';
        severity = Severity.low;
        category = Category.billing;
        description = 'Olvidé cómo ver mis facturas';
      } else if (kind == 'security') {
        id = 'T-3001';
        severity = Severity.medium;
        category = Category.security;
        description = 'Reporte de acceso sospechoso';
      } else if (kind == 'l2') {
        id = 'T-4001';
        severity = Severity.high;
        category = Category.technical;
        description = 'Error crítico en producción';
      } else if (kind == 'l1') {
        id = 'T-5001';
        severity = Severity.low;
        category = Category.technical;
        description = 'No carga la app a veces';
      } else {
        // manager escalation
        id = 'T-9001';
        severity = Severity.high;
        category = Category.other;
        description = 'Caso no contemplado por equipos';
      }
      result = null;
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
                  'Cadena de Responsabilidad: Mesa de Ayuda',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Ruteo progresivo de tickets por reglas',
                  style: Theme.of(
                    context,
                  ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 12),
                LayoutBuilder(
                  builder: (context, c) {
                    final twoCols = c.maxWidth > 760;
                    final form = _buildForm(cs);
                    final presets = _buildPresets(cs);
                    if (twoCols) {
                      return Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(child: form),
                          const SizedBox(width: 16),
                          Expanded(child: presets),
                        ],
                      );
                    }
                    return Column(
                      children: [form, const SizedBox(height: 16), presets],
                    );
                  },
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        LayoutBuilder(
          builder: (context, c) {
            final twoCols = c.maxWidth > 760;
            final resultCard = _buildResult(cs);
            final historyCard = _buildHistory(cs);
            if (twoCols) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: resultCard),
                  const SizedBox(width: 16),
                  Expanded(child: historyCard),
                ],
              );
            }
            return Column(
              children: [resultCard, const SizedBox(height: 16), historyCard],
            );
          },
        ),
      ],
    );
  }

  Widget _buildForm(ColorScheme cs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Ticket',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 8),
        TextField(
          decoration: const InputDecoration(labelText: 'ID'),
          controller: TextEditingController(text: id)
            ..selection = TextSelection.collapsed(offset: id.length),
          onChanged: (v) => id = v,
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            SizedBox(
              width: 200,
              child: DropdownButtonFormField<Severity>(
                decoration: const InputDecoration(labelText: 'Severidad'),
                value: severity,
                items: Severity.values
                    .map((s) => DropdownMenuItem(value: s, child: Text(s.name)))
                    .toList(),
                onChanged: (v) => setState(() => severity = v ?? severity),
              ),
            ),
            SizedBox(
              width: 200,
              child: DropdownButtonFormField<Category>(
                decoration: const InputDecoration(labelText: 'Categoría'),
                value: category,
                items: Category.values
                    .map((c) => DropdownMenuItem(value: c, child: Text(c.name)))
                    .toList(),
                onChanged: (v) => setState(() => category = v ?? category),
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        TextField(
          minLines: 1,
          maxLines: 3,
          decoration: const InputDecoration(labelText: 'Descripción'),
          controller: TextEditingController(text: description)
            ..selection = TextSelection.collapsed(offset: description.length),
          onChanged: (v) => description = v,
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            ElevatedButton.icon(
              onPressed: _run,
              icon: const Icon(Icons.rocket_launch),
              label: const Text('Enviar por la cadena'),
            ),
            OutlinedButton.icon(
              onPressed: _resetForm,
              icon: const Icon(Icons.refresh),
              label: const Text('Restablecer'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPresets(ColorScheme cs) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Atajos',
          style: Theme.of(
            context,
          ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            OutlinedButton(
              onPressed: () => _preset('faq'),
              child: const Text('FAQ (Facturación, Baja)'),
            ),
            OutlinedButton(
              onPressed: () => _preset('security'),
              child: const Text('Seguridad'),
            ),
            OutlinedButton(
              onPressed: () => _preset('l1'),
              child: const Text('Soporte L1'),
            ),
            OutlinedButton(
              onPressed: () => _preset('l2'),
              child: const Text('Soporte L2'),
            ),
            OutlinedButton(
              onPressed: () => _preset('manager'),
              child: const Text('Escalar a Manager'),
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
            'Cadena: AutoResuelveFAQ → EquipoSeguridad → SoporteNivel1 → SoporteNivel2 → EscalamientoGerencia',
            style: Theme.of(
              context,
            ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
          ),
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
        padding: const EdgeInsets.all(16),
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
            if (result == null)
              Row(
                children: [
                  const Icon(Icons.info_outline, size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Completa el ticket y envíalo para ver cómo la cadena lo procesa.',
                    ),
                  ),
                ],
              )
            else ...[
              Row(
                children: [
                  const Icon(Icons.check_circle, color: Colors.green, size: 20),
                  const SizedBox(width: 6),
                  Expanded(child: Text(result!.message)),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'Atendido por: ${result!.handledBy}',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const SizedBox(height: 4),
              Text(
                'Ruta en la cadena:',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const SizedBox(height: 6),
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children: [
                  for (int i = 0; i < result!.trail.length; i++)
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: i == result!.trail.length - 1
                            ? Colors.green.withOpacity(.15)
                            : cs.surfaceVariant,
                        borderRadius: BorderRadius.circular(999),
                        border: Border.all(
                          color: i == result!.trail.length - 1
                              ? Colors.green
                              : cs.outlineVariant,
                        ),
                      ),
                      child: Text(
                        result!.trail[i],
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: i == result!.trail.length - 1
                              ? Colors.green.shade800
                              : cs.onSurfaceVariant,
                        ),
                      ),
                    ),
                ],
              ),
            ],
          ],
        ),
      ),
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
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Historial',
              style: Theme.of(
                context,
              ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            if (history.isEmpty)
              Text(
                'Sin envíos aún',
                style: Theme.of(
                  context,
                ).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
              )
            else ...[
              for (final h in history.take(30))
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 2),
                  child: Text(
                    '• $h',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ),
            ],
          ],
        ),
      ),
    );
  }
}
