import 'package:design_patterns_flutter/patterns/creational/singleton/ui/pokemon_card.dart'
    show PokemonCard;
import 'package:flutter/material.dart';

class SingletonDemo extends StatefulWidget {
  const SingletonDemo({super.key});

  @override
  State<SingletonDemo> createState() => _SingletonDemoState();
}

class _SingletonDemoState extends State<SingletonDemo> {
  final _controller = TextEditingController(text: 'pikachu');
  String _pokemonName = 'pikachu';

  final _suggestions = const [
    'pikachu',
    'charizard',
    'bulbasaur',
    'squirtle',
    'jigglypuff',
    'mewtwo',
    'eevee',
    'lucario',
  ];

  void _submit() {
    final next = _controller.text.trim().toLowerCase();
    if (next.isNotEmpty) setState(() => _pokemonName = next);
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _controller,
                textInputAction: TextInputAction.search,
                onSubmitted: (_) => _submit(),
                decoration: InputDecoration(
                  hintText: 'Enter Pokemon name (e.g., pikachu, charizard)',
                  border: const OutlineInputBorder(),
                  isDense: true,
                ),
              ),
            ),
            const SizedBox(width: 8),
            ElevatedButton.icon(
              onPressed: _submit,
              icon: const Icon(Icons.search),
              label: const Text('Search'),
            ),
          ],
        ),

        const SizedBox(height: 10),

        // Quick suggestions
        Wrap(
          spacing: 6,
          runSpacing: 6,
          children: _suggestions.map((s) {
            final selected = s == _pokemonName;
            return ChoiceChip(
              label: Text(s),
              selected: selected,
              onSelected: (_) {
                _controller.text = s;
                setState(() => _pokemonName = s);
              },
              selectedColor: cs.primaryContainer,
              labelStyle: TextStyle(
                color: selected ? cs.onPrimaryContainer : null,
              ),
            );
          }).toList(),
        ),

        const SizedBox(height: 16),

        PokemonCard(name: _pokemonName),
      ],
    );
  }
}
