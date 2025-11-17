import type { Book } from "./element-book";
import type { Electronics } from "./element-electronics";
import type { Grocery } from "./element-grocery";

/**
 * Interfaz Visitor declara un conjunto de métodos de visita
 */

export interface Visitor {
  visitBook(e: Book): void;
  visitElectronics(e: Electronics): void;
  visitGrocery(e: Grocery): void;
}