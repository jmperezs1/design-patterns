import type { Exporter } from './implementor';
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
