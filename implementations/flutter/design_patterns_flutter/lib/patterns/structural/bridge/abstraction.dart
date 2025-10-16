import 'domain/report_data.dart';
import 'implementor.dart';

abstract class Report {
  final Exporter exporter;
  Report(this.exporter);

  Future<ReportData> build();

  Future<ExportResult> generateReport() async {
    final data = await build();
    return exporter.export(data);
  }
}
