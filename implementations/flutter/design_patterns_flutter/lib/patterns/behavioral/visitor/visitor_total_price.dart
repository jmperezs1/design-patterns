import 'visitor.dart';
import 'element_book.dart';
import 'element_electronics.dart';
import 'element_grocery.dart';

class TotalPriceVisitor implements Visitor {
  double subtotal = 0;
  double tax = 0;
  double total = 0;

  @override
  void visitBook(Book e) {
    final base = e.unitPrice * e.qty;
    final t = (e.isImported ? 0.05 : 0) * base; // books exempt, only import
    subtotal += base;
    tax += t;
    total += base + t;
  }

  @override
  void visitElectronics(Electronics e) {
    final base = e.unitPrice * e.qty;
    final t = 0.15 * base;
    subtotal += base;
    tax += t;
    total += base + t;
  }

  @override
  void visitGrocery(Grocery e) {
    final base = e.unitPrice * e.qty;
    final t = 0; // groceries taxed 0
    subtotal += base;
    tax += t;
    total += base + t;
  }
}
