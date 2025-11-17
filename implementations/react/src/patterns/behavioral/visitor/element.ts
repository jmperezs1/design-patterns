import type { Visitor } from "./visitor";


/**
 *  Interfaz Element declara un método 'accept' que toma a un visitante como
 * argumento.
 */
export interface Element {
  accept(v: Visitor): void;
}