import type { CodeSnippet } from '../../../registry/types';

export const bridgeCodeSnippets: CodeSnippet[] = [
  { title: 'implementor.ts', language: 'ts', code: `import type { ReportData } from './interfaces/report-data';

export interface Exporter {
  export(data: ReportData): Promise<{ filename: string; mime: string; text: string }>;
}

const escapeCsv = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

export class CsvExporter implements Exporter {
  async export(data: ReportData) {
    const headers = Object.keys(data.rows[0] ?? {});
    const csv = [
      '# ' + data.title,
      headers.join(','),
      ...data.rows.map((r) => headers.map((h) => escapeCsv((r as any)[h])).join(',')),
    ].join('\n');
    return { filename: data.title + '.csv', mime: 'text/csv', text: csv };
  }
}

export class JsonExporter implements Exporter {
  async export(data: ReportData) {
    const json = JSON.stringify(data, null, 2);
    return { filename: data.title + '.json', mime: 'application/json', text: json };
  }
}
` },
  { title: 'abstraction.ts', language: 'ts', code: `import type { Exporter } from './implementor';
import type { ReportData } from './interfaces/report-data';

export abstract class Report {
  protected exporter: Exporter;
  constructor(exporter: Exporter) { this.exporter = exporter; }

  abstract build(): Promise<ReportData>;

  async generateReport() {
    const data = await this.build();
    return this.exporter.export(data);
  }
}
` },
  { title: 'order-report.ts', language: 'ts', code: `import { Report } from './abstraction';
import type { Exporter } from './implementor';
import type { Order } from './interfaces/order';
import type { ReportData } from './interfaces/report-data';

export class OrdersReport extends Report {
  private orders: Order[];
  constructor(exporter: Exporter, orders: Order[]) { super(exporter); this.orders = orders; }

  async build(): Promise<ReportData> {
    const rows = this.orders.map((o) => ({ id: o.id, customer: o.customer, total: o.total, status: o.status }));
    return { title: 'Orders Report', rows };
  }
}
` },
  { title: 'inventory-report.ts', language: 'ts', code: `import { Report } from './abstraction';
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
` },
];
