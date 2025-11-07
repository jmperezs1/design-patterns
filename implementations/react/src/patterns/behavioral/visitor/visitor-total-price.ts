import type { Book } from "./element-book";
import type { Electronics } from "./element-electronics";
import type { Grocery } from "./element-grocery";
import type { Visitor } from "./visitor";

export class TotalPriceVisitor implements Visitor {
  subtotal = 0;
  tax = 0;
  total = 0;

  visitBook(e: Book) {
    const base = e.unitPrice * e.qty;
    const tax = (e.isImported ? 0.05 : 0) * base;   // libros exentos, solo importación
    this.subtotal += base; this.tax += tax; this.total += base + tax;
  }

  visitElectronics(e: Electronics) {
    const base = e.unitPrice * e.qty;
    const tax = 0.15 * base;                         // IVA distinto
    this.subtotal += base; this.tax += tax; this.total += base + tax;
  }

  visitGrocery(e: Grocery) {
    const base = e.unitPrice * e.qty;
    const tax = 0;                                   // alimentos base 0
    this.subtotal += base; this.tax += tax; this.total += base + tax;
  }
}