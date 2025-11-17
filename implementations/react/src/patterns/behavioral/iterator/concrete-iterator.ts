import type { Playlist } from "./concrete-aggregate";
import type { Song } from "./types/type";
import type { Iterator } from "./iterator";

/**
 * Iterador concreto para la lista de reproducción de canciones.
 */

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
    if (!this.hasNext()) throw new Error("No more elements");
    return this.aggregate.getAt(this.index++);
  }
  remove(): void {
    if (this.index === 0) throw new Error("Call next() before remove()");
    // remove the item returned by the last next()
    this.aggregate.removeAt(this.index - 1);
    this.index--; // step back so iteration stays in sync
  }
  reset(): void { this.index = 0; }
}