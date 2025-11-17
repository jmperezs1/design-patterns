import type { Observer } from "./observer";

/**
 * Subject Interface que define métodos para gestionar observadores y notificarles con datos.
 */

export interface Subject<T> {
  addObserver(o: Observer<T>): void;
  removeObserver(o: Observer<T>): void;
  notifyObservers(d: T): void;
}