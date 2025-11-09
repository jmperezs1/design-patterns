class CalendarReservation {
  final String reservationId;
  CalendarReservation(this.reservationId);
}

class CalendarAPI {
  Future<CalendarReservation> reserve(Map<String, dynamic> slot) async {
    await Future.delayed(const Duration(milliseconds: 100));
    return CalendarReservation('res-${DateTime.now().millisecondsSinceEpoch}');
  }

  Future<void> cancel(String reservationId) async {
    await Future.delayed(const Duration(milliseconds: 60));
    return;
  }
}
