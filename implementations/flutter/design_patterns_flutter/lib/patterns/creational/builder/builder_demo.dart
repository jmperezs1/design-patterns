import 'package:flutter/material.dart';
import 'concrete_builder.dart';
import 'director.dart';
import 'product/card.dart';

class BuilderDemo extends StatefulWidget {
  const BuilderDemo({super.key});

  @override
  State<BuilderDemo> createState() => _BuilderDemoState();
}

class _BuilderDemoState extends State<BuilderDemo> {
  // Persist controllers to avoid losing focus when rebuilding
  late final TextEditingController _titleCtrl;
  late final TextEditingController _subtitleCtrl;
  late final TextEditingController _mediaCtrl;
  late final TextEditingController _bodyCtrl;
  late final TextEditingController _footerCtrl;

  @override
  void initState() {
    super.initState();
    _titleCtrl = TextEditingController(text: 'MacBook Pro 14"');
    _subtitleCtrl = TextEditingController(text: 'M3 Pro');
    _mediaCtrl = TextEditingController(
      text:
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    );
    _bodyCtrl = TextEditingController(
      text: 'Pantalla Liquid Retina XDR y batería de larga duración.',
    );
    _footerCtrl = TextEditingController(text: 'Comprar');

    // Rebuild live preview on each change without replacing controllers
    for (final c in [
      _titleCtrl,
      _subtitleCtrl,
      _mediaCtrl,
      _bodyCtrl,
      _footerCtrl,
    ]) {
      c.addListener(() => setState(() {}));
    }
  }

  @override
  void dispose() {
    _titleCtrl.dispose();
    _subtitleCtrl.dispose();
    _mediaCtrl.dispose();
    _bodyCtrl.dispose();
    _footerCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final director = CardDirector();
    final builder = CardConcreteBuilder();
    final product = director.construct(
      builder,
      title: _titleCtrl.text,
      subtitle: _subtitleCtrl.text,
      mediaUrl: _mediaCtrl.text,
      body: _bodyCtrl.text.isNotEmpty ? Text(_bodyCtrl.text) : null,
      footer: _footerCtrl.text.isNotEmpty
          ? ElevatedButton(onPressed: () {}, child: Text(_footerCtrl.text))
          : null,
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          decoration: BoxDecoration(
            color: Theme.of(
              context,
            ).colorScheme.primaryContainer.withOpacity(.25),
            border: Border.all(
              color: Theme.of(context).colorScheme.primary.withOpacity(.3),
            ),
            borderRadius: BorderRadius.circular(10),
          ),
          padding: const EdgeInsets.all(12),
          child: Text(
            'Cómo interactuar: Cambia los campos para construir diferentes variantes. El Director coordina los pasos del Builder.',
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          crossAxisAlignment: WrapCrossAlignment.start,
          children: [
            SizedBox(
              width: 360,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TextField(
                    decoration: const InputDecoration(labelText: 'Title'),
                    controller: _titleCtrl,
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(labelText: 'Subtitle'),
                    controller: _subtitleCtrl,
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(labelText: 'Media URL'),
                    controller: _mediaCtrl,
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(labelText: 'Body Text'),
                    controller: _bodyCtrl,
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    decoration: const InputDecoration(labelText: 'Footer Text'),
                    controller: _footerCtrl,
                  ),
                ],
              ),
            ),
            ProductCard(product: product),
          ],
        ),
      ],
    );
  }
}
