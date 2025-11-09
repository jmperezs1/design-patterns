import type { Iterator } from "./iterator";
export interface Aggregate<T> {
  createIterator(): Iterator<T>;
}