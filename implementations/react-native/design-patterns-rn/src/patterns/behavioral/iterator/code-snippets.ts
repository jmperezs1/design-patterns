import type { CodeSnippet } from '../../../registry/types';

export const iteratorCodeSnippets: CodeSnippet[] = [
  { title: 'iterator.ts', language: 'ts', code: `export interface Iterator<T> { hasNext(): boolean; next(): T; remove(): void; reset(): void; }` },
  { title: 'aggregate.ts', language: 'ts', code: `import type { Iterator } from './iterator';\nexport interface Aggregate<T> { createIterator(): Iterator<T>; }` },
  { title: 'concrete-iterator.tsx', language: 'tsx', code: `import type { Playlist } from './concrete-aggregate';\nimport type { Song } from './types';\nimport type { Iterator } from './iterator';\nexport class PlaylistIterator implements Iterator<Song> {\n  private index = 0; private readonly aggregate: Playlist;\n  constructor(aggregate: Playlist) { this.aggregate = aggregate; }\n  hasNext(): boolean { return this.index < this.aggregate.length; }\n  next(): Song { if (!this.hasNext()) throw new Error('No more elements'); return this.aggregate.getAt(this.index++); }\n  remove(): void { if (this.index === 0) throw new Error('Call next() before remove()'); this.aggregate.removeAt(this.index - 1); this.index--; }\n  reset(): void { this.index = 0; }\n}` },
];
