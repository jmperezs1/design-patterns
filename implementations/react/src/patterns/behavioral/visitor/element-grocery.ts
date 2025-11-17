import type { Visitor } from "./visitor";
import type { Element } from "./element";

/**
 * Concrete Element que representa un artículo de supermercado
 */

export class Grocery implements Element {
  public name: string;
  public unitPrice: number;
  public qty: number;
  public perishable: boolean;

  constructor(
    name: string,
    unitPrice: number,
    qty: number,
    perishable = true
  ) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.qty = qty;
    this.perishable = perishable;
  }

  accept(v: Visitor) { v.visitGrocery(this); }
}