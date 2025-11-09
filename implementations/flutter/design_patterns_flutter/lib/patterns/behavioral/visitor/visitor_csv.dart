import 'visitor.dart';
import 'element_book.dart';
import 'element_electronics.dart';
import 'element_grocery.dart';

class CsvExportVisitor implements Visitor {
  final List<String> rows = ['type,name,qty,unitPrice,extra'];

  @override
  void visitBook(Book e) {
    rows.add('book,"${e.title.replaceAll('"', '""')}",${e.qty},${e.unitPrice},imported=${e.isImported}');
  }

  @override
  void visitElectronics(Electronics e) {
    rows.add('electronics,"${e.name.replaceAll('"', '""')}",${e.qty},${e.unitPrice},fragile=${e.fragile}');
  }

  @override
  void visitGrocery(Grocery e) {
    rows.add('grocery,"${e.name.replaceAll('"', '""')}",${e.qty},${e.unitPrice},perishable=${e.perishable}');
  }

  @override
  String toString() => rows.join('\n');
}
