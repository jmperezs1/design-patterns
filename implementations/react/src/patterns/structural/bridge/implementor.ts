import type { ReportData } from "./interfaces/report-data";

/**
 * Interfaz que define el método de exportación para diferentes formatos de reporte.
 */

export interface Exporter {
  export(data: ReportData): Promise<{ filename: string; mime: string; text: string }>;
}