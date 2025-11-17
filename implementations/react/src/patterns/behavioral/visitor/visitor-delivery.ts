import type { Book } from "./element-book";
import type { Electronics } from "./element-electronics";
import type { Grocery } from "./element-grocery";
import type { Visitor } from "./visitor";

/**
 * Concrete Visitor que estima el costo de envío
 */

export class ShippingEstimatorVisitor implements Visitor {
  shipping = 0;

  visitBook(e: Book) {
    this.shipping += 2 * e.qty;                     
  }

  visitElectronics(e: Electronics) {
    this.shipping += (e.fragile ? 10 : 6) * e.qty;  
  }

  visitGrocery(e: Grocery) {
    this.shipping += (e.perishable ? 8 : 4) * e.qty;
  }
}