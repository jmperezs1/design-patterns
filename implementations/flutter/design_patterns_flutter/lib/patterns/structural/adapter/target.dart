import 'domain/user.dart';

abstract class Target {
  Future<List<User>> request();
}
