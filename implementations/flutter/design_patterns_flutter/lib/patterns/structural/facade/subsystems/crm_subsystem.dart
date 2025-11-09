import '../types.dart';

class CrmCustomer {
  final String customerId;
  final String email;
  final String? phone;

  CrmCustomer({required this.customerId, required this.email, this.phone});
}

class CrmActivity {
  final String activityId;
  CrmActivity(this.activityId);
}

class CRMService {
  int _id = 1;

  Future<CrmCustomer> upsertCustomer(Customer c) async {
    // Simulate network delay
    await Future.delayed(const Duration(milliseconds: 120));
    return CrmCustomer(customerId: 'cust-${_id++}', email: c.email, phone: c.phone);
  }

  Future<CrmActivity> createActivity(Map<String, dynamic> opts) async {
    await Future.delayed(const Duration(milliseconds: 80));
    return CrmActivity('act-${DateTime.now().millisecondsSinceEpoch}');
  }
}
