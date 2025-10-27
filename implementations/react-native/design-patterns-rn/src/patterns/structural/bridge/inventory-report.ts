import { Report } from './abstraction';
import type { Product } from './interfaces/product';
import type { Exporter } from './implementor';
import type { ReportData } from './interfaces/report-data';

export class InventoryReport extends Report {
  private items: Product[];
  constructor(exporter: Exporter, items: Product[]) { super(exporter); this.items = items; }

  async build(): Promise<ReportData> {
    const rows = this.items.map((p) => ({
      sku: p.sku,
      name: p.name,
      stock: p.stock,
      min: p.min,
      value: p.stock * p.min,
    }));
    return { title: 'Inventory Report', rows };
  }
}
