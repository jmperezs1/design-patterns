import type { Iterator } from "./iterator";

/**
 * Interfaz del agregado que define el método para crear un iterador.
 */

export interface Aggregate<T> {
  createIterator(): Iterator<T>;
}