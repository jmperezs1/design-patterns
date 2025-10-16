import 'adaptee.dart';
import 'domain/user.dart';
import 'target.dart';

class Adapter implements Target {
  final Adaptee adaptee;
  Adapter(this.adaptee);

  @override
  Future<List<User>> request() async {
    final csv = await adaptee.specificRequest();
    final lines = csv.trim().split(RegExp(r'\r?\n'));
    final rows = lines.skip(1).where((e) => e.trim().isNotEmpty);
    return rows.map((row) {
      final parts = row.split(',');
      final id = int.tryParse(parts.elementAt(0)) ?? 0;
      final name = parts.length > 1 ? parts[1].trim() : '';
      final email = parts.length > 2 ? parts[2].trim() : '';
      return User(id: id, name: name, email: email);
    }).toList();
  }
}
