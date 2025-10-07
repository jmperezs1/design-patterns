import { Report } from "./abstraction";
import type { Exporter } from "./implementor";
import type { Product } from "./interfaces/product";
import type { ReportData } from "./interfaces/report-data";
import type { Row } from "./interfaces/row";

export class InventoryReport extends Report {
  private items: Array<Product>;
  
  constructor(exporter: Exporter, items: Array<Product>) {
    super(exporter);
    this.items = items;
  }
  
  async build(): Promise<ReportData> {
    const rows: Row[] = this.items.map(item => ({
      sku: item.sku, 
      name: item.name, 
      stock: item.stock, 
      min: item.min,
      value: item.stock * item.min
    }));
    return { title: "Inventory Report", rows };
  }
}