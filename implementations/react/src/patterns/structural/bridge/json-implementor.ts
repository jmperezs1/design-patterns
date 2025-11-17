import type { Exporter } from "./implementor";
import type { ReportData } from "./interfaces/report-data";

/**
 * Implementación concreta de Exporter que genera reportes en formato JSON.
 */

export class JsonExporter implements Exporter {

  async export(data: ReportData) {
    const json = JSON.stringify(data, null, 2);
    return { filename: data.title + ".json", mime: "application/json", text: json };
  }
}