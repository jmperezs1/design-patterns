import type { Visitor } from './visitor';
import type { Element } from './element';

export class Book implements Element {
  public title: string;
  public unitPrice: number;
  public qty: number;
  public isImported: boolean;

  constructor(title: string, unitPrice: number, qty: number, isImported = false) {
    this.title = title;
    this.unitPrice = unitPrice;
    this.qty = qty;
    this.isImported = isImported;
  }

  accept(v: Visitor) { v.visitBook(this); }
}
