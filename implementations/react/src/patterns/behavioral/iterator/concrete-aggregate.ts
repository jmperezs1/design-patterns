import type { Aggregate } from "./aggregate";
import { PlaylistIterator } from "./concrete-iterator";
import type { Song } from "./types/type";
import type { Iterator } from "./iterator";

export class Playlist implements Aggregate<Song> {
  private items: Song[] = [];
  add(song: Song) { this.items.push(song); }
  get length() { return this.items.length; }
  getAt(i: number) { return this.items[i]; }
  removeAt(i: number) { this.items.splice(i, 1); }

  createIterator(): Iterator<Song> {
    return new PlaylistIterator(this);
  }
}