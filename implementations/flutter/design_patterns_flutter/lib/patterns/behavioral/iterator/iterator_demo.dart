import 'dart:math';

import 'package:flutter/material.dart';
import 'concrete_aggregate.dart';
import 'concrete_iterator.dart';
import 'types.dart';

class IteratorDemo extends StatefulWidget {
  const IteratorDemo({super.key});

  @override
  State<IteratorDemo> createState() => _IteratorDemoState();
}

class _IteratorDemoState extends State<IteratorDemo> {
  final Playlist playlist = Playlist();
  PlaylistIterator? iterator;

  final TextEditingController _titleController = TextEditingController(text: 'Nueva canción');
  final TextEditingController _artistController = TextEditingController(text: 'Artista');

  Song? current;
  String? lastMsg;

  @override
  void dispose() {
    _titleController.dispose();
    _artistController.dispose();
    super.dispose();
  }

  void addSong() {
    final id = '${DateTime.now().millisecondsSinceEpoch}${Random().nextInt(100000)}';
    final s = Song(id: id, title: _titleController.text.isNotEmpty ? _titleController.text : 'Untitled', artist: _artistController.text.isNotEmpty ? _artistController.text : 'Unknown');
    playlist.add(s);
    setState(() {
      lastMsg = 'Agregada: ${s.title} — ${s.artist}';
    });
  }

  void createIterator() {
    iterator = playlist.createIterator();
    iterator?.reset();
    setState(() {
      current = null;
      lastMsg = 'Iterador creado';
    });
  }

  void next() {
    if (iterator == null) createIterator();
    final it = iterator!;
    if (!it.hasNext()) {
      setState(() {
        lastMsg = 'No hay más elementos';
      });
      return;
    }
    try {
      final s = it.next();
      setState(() {
        current = s;
        lastMsg = 'Siguiente: ${s.title} — ${s.artist}';
      });
    } catch (e) {
      setState(() {
        lastMsg = e.toString();
      });
    }
  }

  void removeCurrent() {
    final it = iterator;
    if (it == null) {
      setState(() {
        lastMsg = 'Crea un iterador y avanza antes de eliminar';
      });
      return;
    }
    try {
      it.remove();
      setState(() {
        current = null;
        lastMsg = 'Elemento eliminado';
      });
    } catch (e) {
      setState(() {
        lastMsg = e.toString();
      });
    }
  }

  void reset() {
    if (iterator == null) {
      setState(() {
        lastMsg = 'Iterador no inicializado — creando uno';
      });
      createIterator();
      return;
    }
    iterator?.reset();
    setState(() {
      current = null;
      lastMsg = 'Iterador reiniciado';
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
                  'Iterator: Reproduciendo una playlist',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  'Ejemplo simple de un iterador sobre una colección de canciones.',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant),
                ),
                const SizedBox(height: 12),
                LayoutBuilder(builder: (context, c) {
                  final twoCols = c.maxWidth > 760;
                  final form = Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _titleController,
                          decoration: const InputDecoration(labelText: 'Título'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextField(
                          controller: _artistController,
                          decoration: const InputDecoration(labelText: 'Artista'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      ElevatedButton.icon(
                        onPressed: addSong,
                        icon: const Icon(Icons.add),
                        label: const Text('Agregar'),
                      ),
                    ],
                  );
                  return twoCols ? form : Column(children: [form]);
                }),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        LayoutBuilder(builder: (context, c) {
          final twoCols = c.maxWidth > 860;
          final playlistCard = Card(
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
                  Text('Playlist (${playlist.length})', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 8),
                  if (playlist.length > 0)
                    Column(
                      children: [
                        for (var i = 0; i < playlist.length; i++)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            child: Row(
                              children: [
                                Text('${i + 1}.', style: const TextStyle(fontWeight: FontWeight.w600)),
                                const SizedBox(width: 8),
                                Expanded(child: Text(playlist.getAt(i).title)),
                                const SizedBox(width: 12),
                                Text(playlist.getAt(i).artist, style: TextStyle(color: cs.onSurfaceVariant)),
                              ],
                            ),
                          ),
                      ],
                    )
                  else
                    Text('La playlist está vacía', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant)),
                ],
              ),
            ),
          );

          final controlCard = Card(
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
                  Text('Iteración', style: Theme.of(context).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 12,
                    runSpacing: 8,
                    children: [
                      ElevatedButton.icon(onPressed: createIterator, icon: const Icon(Icons.play_arrow), label: const Text('Crear iterador')),
                      ElevatedButton(onPressed: next, child: const Text('Siguiente')),
                      OutlinedButton.icon(onPressed: removeCurrent, icon: const Icon(Icons.delete), label: const Text('Eliminar')),
                      OutlinedButton(onPressed: reset, child: const Text('Reiniciar')),
                    ],
                  ),
                  const SizedBox(height: 12),
                  if (current != null)
                    Container(
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: cs.surfaceVariant.withOpacity(.3),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: cs.outlineVariant),
                      ),
                      padding: const EdgeInsets.all(12),
                      child: Text('Reproduciendo: ${current!.title} · ${current!.artist}'),
                    )
                  else
                    Container(
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: cs.surfaceVariant.withOpacity(.12),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: cs.outlineVariant),
                      ),
                      padding: const EdgeInsets.all(12),
                      child: Text(lastMsg ?? 'Ningún elemento seleccionado', style: Theme.of(context).textTheme.bodySmall?.copyWith(color: cs.onSurfaceVariant)),
                    ),
                ],
              ),
            ),
          );

          if (twoCols) {
            return Row(children: [Expanded(child: playlistCard), const SizedBox(width: 16), Expanded(child: controlCard)]);
          }
          return Column(children: [playlistCard, const SizedBox(height: 12), controlCard]);
        }),
      ],
    );
  }
}
