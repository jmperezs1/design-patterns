import type { Playlist } from './concrete-aggregate';
import type { Song } from './types';
import type { Iterator } from './iterator';

export class PlaylistIterator implements Iterator<Song> {
  private index = 0;
  private readonly aggregate: Playlist;
  constructor(aggregate: Playlist) {
    this.aggregate = aggregate;
  }

  hasNext(): boolean {
    return this.index < this.aggregate.length;
  }
  next(): Song {
    if (!this.hasNext()) throw new Error('No more elements');
    return this.aggregate.getAt(this.index++);
  }
  remove(): void {
    if (this.index === 0) throw new Error('Call next() before remove()');
    this.aggregate.removeAt(this.index - 1);
    this.index--;
  }
  reset(): void { this.index = 0; }
}
