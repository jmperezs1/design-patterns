import 'abstract_class.dart';

class SignupFlow extends FormTemplate {
  @override
  Map<String, dynamic> validate(Map<String, dynamic> data) {
    if (data['email'] == null || (data['email'] as String).trim().isEmpty) {
      throw Exception('Email is required');
    }
    if (data['password'] == null || (data['password'] as String).isEmpty) {
      throw Exception('Password is required');
    }
    return {
      'email': (data['email'] as String).trim().toLowerCase(),
      'password': data['password'],
    };
  }

  @override
  Future<dynamic> send(Map<String, dynamic> cleanData) async {
    // simulate network call
    print('[Signup] sending to server: $cleanData');
    return {
      'userId': 'user_' + DateTime.now().millisecondsSinceEpoch.toString(),
      'email': cleanData['email'],
    };
  }

  @override
  Future<void> afterSuccess(result) async {
    // pretend we send analytics
    print('[Signup] analytics event for user ${result['userId']}');
  }

  @override
  String successMessage(result) {
    return 'Welcome, ${result['email']}! Your account is ready.';
  }
}
