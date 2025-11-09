import type { Book } from './element-book';
import type { Electronics } from './element-electronics';
import type { Grocery } from './element-grocery';
import type { Visitor } from './visitor';

export class CsvExportVisitor implements Visitor {
  rows: string[] = ['type,name,qty,unitPrice,extra'];
  visitBook(e: Book) {
    this.rows.push(`book,${csv(e.title)},${e.qty},${e.unitPrice},imported=${e.isImported}`);
  }
  visitElectronics(e: Electronics) {
    this.rows.push(`electronics,${csv(e.name)},${e.qty},${e.unitPrice},fragile=${e.fragile}`);
  }
  visitGrocery(e: Grocery) {
    this.rows.push(`grocery,${csv(e.name)},${e.qty},${e.unitPrice},perishable=${e.perishable}`);
  }
  toString() { return this.rows.join('\n'); }
}
const csv = (s: string) => `"${s.replace(/"/g, '""') }"`;
