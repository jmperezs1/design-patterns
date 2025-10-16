import 'dart:convert';
import 'domain/report_data.dart';

abstract class Exporter {
  Future<ExportResult> export(ReportData data);
}

String _escapeCsv(Object? v) {
  final s = (v ?? '').toString();
  return RegExp(r'[",\n]').hasMatch(s) ? '"${s.replaceAll('"', '""')}"' : s;
}

class CsvExporter implements Exporter {
  @override
  Future<ExportResult> export(ReportData data) async {
    final headers = data.rows.isNotEmpty ? data.rows.first.keys.toList() : <String>[];
    final csvLines = <String>[
      '# ${data.title}',
      headers.join(','),
      ...data.rows.map((r) => headers.map((h) => _escapeCsv(r[h])).join(',')),
    ];
    final text = csvLines.join('\n');
    return ExportResult(filename: '${data.title}.csv', mime: 'text/csv', text: text);
  }
}

class JsonExporter implements Exporter {
  @override
  Future<ExportResult> export(ReportData data) async {
    // Keep it simple; pretty JSON using Dart's string since no dart:convert dependency constraints
    // but we can import dart:convert which is standard.
    return ExportResult(
      filename: '${data.title}.json',
      mime: 'application/json',
      text: _toPrettyJson(data),
    );
  }

  String _toPrettyJson(ReportData data) {
    // Use dart:convert for JSON formatting
    return _jsonEncode({
      'title': data.title,
      'rows': data.rows,
    });
  }

  String _jsonEncode(Object? obj) {
    // Use JsonEncoder with indentation for readability
    final encoder = JsonEncoder.withIndent('  ');
    return encoder.convert(obj);
  }
}
