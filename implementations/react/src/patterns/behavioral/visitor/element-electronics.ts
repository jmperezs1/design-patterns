import type { Visitor } from "./visitor";
import type { Element } from "./element";


/**
 *  Concrete Element que representa un artículo electrónico
 */

export class Electronics implements Element {
  name: string;
  unitPrice: number;
  qty: number;
  fragile: boolean;

  constructor(
    name: string,
    unitPrice: number,
    qty: number,
    fragile = true
  ) {
    this.name = name;
    this.unitPrice = unitPrice;
    this.qty = qty;
    this.fragile = fragile;
  }
  accept(v: Visitor) { v.visitElectronics(this); }
}