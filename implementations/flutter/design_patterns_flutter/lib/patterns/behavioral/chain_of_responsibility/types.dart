/// Types used by the Chain of Responsibility support example.

enum Severity { low, medium, high }

enum Category { billing, technical, security, other }

class Ticket {
  final String id;
  final Severity severity;
  final Category category;
  final String description;
  Ticket({
    required this.id,
    required this.severity,
    required this.category,
    required this.description,
  });
}

class HandleResult {
  final String handledBy;
  final String message;
  final List<String> trail;
  HandleResult({
    required this.handledBy,
    required this.message,
    required this.trail,
  });
}

const _rank = {Severity.low: 1, Severity.medium: 2, Severity.high: 3};
int severityRank(Severity s) => _rank[s] ?? 0;
