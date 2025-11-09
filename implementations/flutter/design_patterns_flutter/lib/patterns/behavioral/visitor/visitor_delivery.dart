import 'visitor.dart';
import 'element_book.dart';
import 'element_electronics.dart';
import 'element_grocery.dart';

class ShippingEstimatorVisitor implements Visitor {
  double shipping = 0;

  @override
  void visitBook(Book e) {
    shipping += 2 * e.qty; // light tariff
  }

  @override
  void visitElectronics(Electronics e) {
    shipping += (e.fragile ? 10 : 6) * e.qty; // fragile insured
  }

  @override
  void visitGrocery(Grocery e) {
    shipping += (e.perishable ? 8 : 4) * e.qty; // cold chain
  }
}
