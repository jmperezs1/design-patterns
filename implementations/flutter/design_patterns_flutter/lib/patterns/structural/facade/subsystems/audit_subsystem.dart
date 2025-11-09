class AuditLogger {
  String log(String message) {
    final m = '${DateTime.now().toIso8601String()} - $message';
    // In a real system we would persist; here we just return the message so callers can push it to steps.
    return m;
  }
}
