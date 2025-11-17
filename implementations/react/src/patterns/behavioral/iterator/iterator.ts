
/**
 * Interfaz del iterador que define los métodos para recorrer una colección.
 */
export interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
  remove(): void;
  reset(): void;    
}