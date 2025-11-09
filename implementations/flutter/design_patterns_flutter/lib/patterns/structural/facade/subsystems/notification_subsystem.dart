class NotificationService {
  Future<void> email(String to, String subject, String body) async {
    await Future.delayed(const Duration(milliseconds: 80));
    return;
  }

  Future<void> sms(String to, String body) async {
    await Future.delayed(const Duration(milliseconds: 60));
    return;
  }
}
