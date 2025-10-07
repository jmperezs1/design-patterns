import type { ReportData } from "./interfaces/report-data";


export interface Exporter {
  export(data: ReportData): Promise<{ filename: string; mime: string; text: string }>;
}