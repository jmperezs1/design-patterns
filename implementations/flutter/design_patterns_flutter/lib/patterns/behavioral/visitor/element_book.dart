import 'element.dart';
import 'visitor.dart';

class Book implements Element {
  final String title;
  final double unitPrice;
  int qty;
  final bool isImported;

  Book(this.title, this.unitPrice, this.qty, [this.isImported = false]);

  @override
  void accept(Visitor v) => v.visitBook(this);
}
