import 'abstract_class.dart';

class ContactFlow extends FormTemplate {
  @override
  Map<String, dynamic> validate(Map<String, dynamic> data) {
    if (data['subject'] == null || (data['subject'] as String).trim().isEmpty) {
      throw Exception('Subject is required');
    }
    if (data['message'] == null || (data['message'] as String).trim().isEmpty) {
      throw Exception('Message is required');
    }
    return {
      'subject': (data['subject'] as String).trim(),
      'message': (data['message'] as String).trim(),
      'priority': data['priority'] ?? 'normal',
    };
  }

  @override
  Future<dynamic> send(Map<String, dynamic> cleanData) async {
    print('[Contact] sending ticket: $cleanData');
    return {
      'ticketId': 'TICKET-' + DateTime.now().millisecondsSinceEpoch.toString(),
      'status': 'open',
    };
  }

  @override
  Future<void> afterSuccess(result) async {
    print('[Contact] notify support about ${result['ticketId']}');
  }

  @override
  String successMessage(result) {
    return 'Ticket ${result['ticketId']} created. We\'ll reply soon.';
  }
}
