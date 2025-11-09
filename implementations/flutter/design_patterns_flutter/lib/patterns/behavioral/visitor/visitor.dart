import 'element_book.dart';
import 'element_electronics.dart';
import 'element_grocery.dart';

abstract class Visitor {
  void visitBook(Book e);
  void visitElectronics(Electronics e);
  void visitGrocery(Grocery e);
}
