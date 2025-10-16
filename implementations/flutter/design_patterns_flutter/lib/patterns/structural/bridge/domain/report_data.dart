class ReportData {
  final String title;
  final List<Map<String, dynamic>> rows;

  const ReportData({required this.title, required this.rows});
}

class ExportResult {
  final String filename;
  final String mime;
  final String text;

  const ExportResult({
    required this.filename,
    required this.mime,
    required this.text,
  });
}
