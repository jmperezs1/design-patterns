import 'aggregate.dart';
import 'types.dart';
import 'concrete_iterator.dart';

class Playlist implements Aggregate<Song> {
  final List<Song> _items = [];

  void add(Song s) => _items.add(s);

  int get length => _items.length;

  Song getAt(int i) => _items[i];

  void removeAt(int i) => _items.removeAt(i);

  @override
  PlaylistIterator createIterator() => PlaylistIterator(this);
}
