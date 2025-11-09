import 'element.dart';
import 'visitor.dart';

class Grocery implements Element {
  final String name;
  final double unitPrice;
  int qty;
  final bool perishable;

  Grocery(this.name, this.unitPrice, this.qty, [this.perishable = true]);

  @override
  void accept(Visitor v) => v.visitGrocery(this);
}
