import type { ReportData } from './interfaces/report-data';

export interface Exporter {
  export(data: ReportData): Promise<{ filename: string; mime: string; text: string }>;
}

const escapeCsv = (v: unknown) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export class CsvExporter implements Exporter {
  async export(data: ReportData) {
    const headers = Object.keys(data.rows[0] ?? {});
    const csv = [
      `# ${data.title}`,
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
