import 'package:flutter/material.dart';
import 'interfaces/email_template.dart';
import 'concrete-prototype.dart';
import 'prototype.dart';

// Simple renderer that applies tokens to strings
String _applyTokens(String input, Map<String, String> tokens) {
  if (input.isEmpty) return input;
  var out = input;
  tokens.forEach((k, v) {
    out = out.replaceAll('{{$k}}', v);
  });
  return out;
}

class EmailTemplateStudio extends StatefulWidget {
  const EmailTemplateStudio({super.key});

  @override
  State<EmailTemplateStudio> createState() => _EmailTemplateStudioState();
}

class _EmailTemplateStudioState extends State<EmailTemplateStudio> {
  late final Map<String, Prototype<EmailTemplate>> templates;

  // UI state
  String selected = 'welcome';
  final fromCtrl = TextEditingController();
  final subjectCtrl = TextEditingController();
  final bodyCtrl = TextEditingController();
  final tokensCtrl = TextEditingController(
    text: [
      'first_name=Ana',
      'app_name=FailFast',
      'reset_link=https://app.example.com/reset?token=XYZ',
      'ttl_minutes=30',
      'headline=Novedades destacadas',
      'summary=Hemos publicado mejoras de rendimiento y estabilidad.',
      'issue=42',
      'cta_label=Leer más',
      'cta_url=https://blog.example.com/issue-42',
    ].join('\n'),
  );

  final outbox = <({String from, String subject, String html})>[];

  @override
  void initState() {
    super.initState();
    final welcome = EmailTemplatePrototype(
      EmailTemplate(
        from: 'noreply@acme.com',
        subject: '¡Bienvenido(a) a {{app_name}}, {{first_name}}!',
        bodyHtml:
            'Hola {{first_name}},\n\n¡Gracias por unirte a {{app_name}}! Nos alegra tenerte aquí.\nComienza explorando tu panel de control.',
        tags: const ['welcome', 'onboarding'],
      ),
    );

    final reset = EmailTemplatePrototype(
      EmailTemplate(
        from: 'security@acme.com',
        subject: 'Restablece tu contraseña de {{app_name}}',
        bodyHtml:
            'Hemos recibido una solicitud para restablecer tu contraseña.\n\nEnlace: {{reset_link}} (expira en {{ttl_minutes}} minutos).',
        tags: const ['security', 'password-reset'],
      ),
    );

    final newsletter = EmailTemplatePrototype(
      EmailTemplate(
        from: 'news@acme.com',
        subject: '{{app_name}} Semanal — Edición #{{issue}}',
        bodyHtml: '{{headline}}\n\n{{summary}}\n\n{{cta_label}}: {{cta_url}}',
        tags: const ['newsletter'],
      ),
    );

    templates = {
      'welcome': welcome,
      'reset_password': reset,
      'newsletter': newsletter,
    };
  }

  Map<String, String> _parseTokens(String text) {
    final map = <String, String>{};
    for (final raw in text.split('\n')) {
      final line = raw.trim();
      final eq = line.indexOf('=');
      if (eq == -1) continue;
      final k = line.substring(0, eq).trim();
      final v = line.substring(eq + 1).trim();
      map[k] = v;
    }
    return map;
  }

  EmailTemplate _preview() {
    final base = templates[selected]!;
    final overrides = EmailTemplate(
      from: fromCtrl.text.isNotEmpty ? fromCtrl.text : null,
      subject: subjectCtrl.text.isNotEmpty ? subjectCtrl.text : null,
      bodyHtml: bodyCtrl.text.isNotEmpty ? bodyCtrl.text : null,
    );
    return base.clone(overrides).get();
  }

  void _cloneAndAdd() {
    final tpl = _preview();
    final tokens = _parseTokens(tokensCtrl.text);
    final content = _applyTokens(tpl.bodyHtml ?? '', tokens);
    setState(() {
      outbox.add((
        from: tpl.from ?? '',
        subject: tpl.subject ?? '',
        html: content,
      ));
    });
  }

  void _loadTemplateIntoOverrides() {
    final base = templates[selected]!.get();
    fromCtrl.text = base.from ?? '';
    subjectCtrl.text = base.subject ?? '';
    bodyCtrl.text = base.bodyHtml ?? '';
    setState(() {});
  }

  void _clearOverrides() {
    fromCtrl.clear();
    subjectCtrl.clear();
    bodyCtrl.clear();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final tpl = _preview();
    final tokens = _parseTokens(tokensCtrl.text);
    final body = _applyTokens(tpl.bodyHtml ?? '', tokens);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        LayoutBuilder(
          builder: (context, c) {
            final double controlsWidth = c.maxWidth > 380 ? 360 : c.maxWidth;
            final controls = SizedBox(
              width: controlsWidth,
              child: Column(
                children: [
                  DropdownButtonFormField<String>(
                    decoration: const InputDecoration(labelText: 'Plantilla'),
                    value: selected,
                    items: const [
                      DropdownMenuItem(
                        value: 'welcome',
                        child: Text('welcome (bienvenida)'),
                      ),
                      DropdownMenuItem(
                        value: 'reset_password',
                        child: Text('reset_password (restablecer)'),
                      ),
                      DropdownMenuItem(
                        value: 'newsletter',
                        child: Text('newsletter (boletín)'),
                      ),
                    ],
                    onChanged: (v) => setState(() => selected = v ?? 'welcome'),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      OutlinedButton(
                        onPressed: _loadTemplateIntoOverrides,
                        child: const Text('Cargar base → overrides'),
                      ),
                      OutlinedButton(
                        onPressed: _clearOverrides,
                        child: const Text('Limpiar overrides'),
                      ),
                    ],
                  ),
                  const Divider(height: 24),
                  TextField(
                    controller: fromCtrl,
                    decoration: const InputDecoration(
                      labelText: 'Remitente (override)',
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: subjectCtrl,
                    decoration: const InputDecoration(
                      labelText: 'Asunto (override)',
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: bodyCtrl,
                    decoration: const InputDecoration(
                      labelText: 'Contenido (override)',
                    ),
                    maxLines: 8,
                  ),
                  const Divider(height: 24),
                  TextField(
                    controller: tokensCtrl,
                    decoration: const InputDecoration(
                      labelText: 'Tokens (clave=valor por línea)',
                    ),
                    maxLines: 8,
                  ),
                  const SizedBox(height: 8),
                  OutlinedButton(
                    onPressed: _cloneAndAdd,
                    child: const Text('Clonar y añadir a Outbox'),
                  ),
                ],
              ),
            );

            final previewCard = Container(
              constraints: const BoxConstraints(minHeight: 200),
              decoration: BoxDecoration(
                border: Border.all(color: Theme.of(context).dividerColor),
                borderRadius: BorderRadius.circular(12),
              ),
              clipBehavior: Clip.antiAlias,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surface,
                      border: Border(
                        bottom: BorderSide(
                          color: Theme.of(context).dividerColor,
                        ),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Remitente',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                        Text(
                          tpl.from ?? '',
                          style: const TextStyle(fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Asunto',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                        Text(tpl.subject ?? ''),
                      ],
                    ),
                  ),
                  // Fixed-height scroll; show plain content
                  SizedBox(
                    height: 340,
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.all(12),
                      child: SelectableText(
                        body,
                        style: const TextStyle(
                          fontFamily: 'monospace',
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );

            if (c.maxWidth > 720) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  controls,
                  const SizedBox(width: 12),
                  Expanded(child: previewCard),
                ],
              );
            }
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [controls, const SizedBox(height: 12), previewCard],
            );
          },
        ),
        const SizedBox(height: 16),
        Text(
          'Outbox (clones renderizados)',
          style: Theme.of(context).textTheme.titleSmall,
        ),
        if (outbox.isEmpty)
          const Text(
            'Aún no hay clones. Usa “Clonar y añadir”.',
            style: TextStyle(color: Colors.grey),
          )
        else
          Column(
            children: [
              for (final em in outbox)
                Container(
                  margin: const EdgeInsets.only(top: 8),
                  decoration: BoxDecoration(
                    border: Border.all(color: Theme.of(context).dividerColor),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.surface,
                          border: Border(
                            bottom: BorderSide(
                              color: Theme.of(context).dividerColor,
                            ),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Remitente',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey,
                              ),
                            ),
                            Text(
                              em.from,
                              style: const TextStyle(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 8),
                            const Text(
                              'Asunto',
                              style: TextStyle(
                                fontSize: 12,
                                color: Colors.grey,
                              ),
                            ),
                            Text(em.subject),
                          ],
                        ),
                      ),
                      SingleChildScrollView(
                        padding: const EdgeInsets.all(12),
                        child: SelectableText(
                          em.html,
                          style: const TextStyle(
                            fontFamily: 'monospace',
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
      ],
    );
  }
}
