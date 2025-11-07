import type { Observer } from "./observer";

export interface Subject<T> {
  addObserver(o: Observer<T>): void;
  removeObserver(o: Observer<T>): void;
  notifyObservers(d: T): void;
}