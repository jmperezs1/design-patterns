import 'package:design_patterns_flutter/patterns/creational/singleton/singleton.dart';
import 'package:flutter/material.dart';

class PokemonCard extends StatelessWidget {
  const PokemonCard({super.key, required this.name});
  final String name;

  @override
  Widget build(BuildContext context) {
    final api = PokemonApi.instance; // or: PokemonApi()

    return FutureBuilder<Map<String, dynamic>>(
      future: api.getPokemonData(name),
      builder: (context, snap) {
        if (snap.connectionState == ConnectionState.waiting) {
          return const Card(
            child: Padding(
              padding: EdgeInsets.all(12),
              child: Text('Loading…'),
            ),
          );
        }
        if (snap.hasError) {
          return Card(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Text('Error: ${snap.error}'),
            ),
          );
        }

        final data = snap.data!;
        final sprites = data['sprites'] as Map<String, dynamic>?;
        final img = sprites?['front_default'] as String?;

        return Card(
          child: ListTile(
            leading: img != null
                ? Image.network(img, width: 56, height: 56)
                : const Icon(Icons.catching_pokemon),
            title: Text((data['name'] as String).toUpperCase()),
            subtitle: Text(
              'ID: ${data['id']}  •  Height: ${data['height']}  •  Weight: ${data['weight']}',
            ),
          ),
        );
      },
    );
  }
}
