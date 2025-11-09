class Customer {
  final String name;
  final String email;
  final String? phone;

  Customer({required this.name, required this.email, this.phone});
}

class Payment {
  final double amount;
  final String currency;

  Payment({required this.amount, required this.currency});
}

class Slot {
  final String resourceId;
  final String start; // ISO string
  final String end;

  Slot({required this.resourceId, required this.start, required this.end});
}
