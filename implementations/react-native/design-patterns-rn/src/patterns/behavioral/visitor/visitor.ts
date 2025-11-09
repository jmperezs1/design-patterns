import type { Book } from "./element-book.ts";
import type { Electronics } from "./element-electronics.ts";
import type { Grocery } from "./element-grocery.ts";

export interface Visitor {
  visitBook(e: Book): void;
  visitElectronics(e: Electronics): void;
  visitGrocery(e: Grocery): void;
}
