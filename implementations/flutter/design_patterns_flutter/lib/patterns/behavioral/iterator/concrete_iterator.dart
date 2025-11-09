import 'iterator.dart';
import 'concrete_aggregate.dart';
import 'types.dart';

class PlaylistIterator implements IteratorIface<Song> {
  int _index = 0;
  final Playlist aggregate;

  PlaylistIterator(this.aggregate);

  @override
  bool hasNext() => _index < aggregate.length;

  @override
  Song next() {
    if (!hasNext()) throw Exception('No more elements');
    return aggregate.getAt(_index++);
  }

  @override
  void remove() {
    if (_index == 0) throw Exception('Call next() before remove()');
    aggregate.removeAt(_index - 1);
    _index--;
  }

  @override
  void reset() {
    _index = 0;
  }
}
