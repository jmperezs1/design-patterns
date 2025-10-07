import { escapeCsv } from "./helpers/implementor";
import type { Exporter } from "./implementor";
import type { ReportData } from "./interfaces/report-data";

export class CsvExporter implements Exporter {

  async export(data: ReportData) {
    const headers = Object.keys(data.rows[0] ?? {});
    const csv = [
      `# ${data.title}`,
      headers.join(","),
      ...data.rows.map(r => headers.map(h => escapeCsv(r[h])).join(",")),
    ].join("\n");

    return { filename: data.title + ".csv", mime: "text/csv", text: csv };
  }
}