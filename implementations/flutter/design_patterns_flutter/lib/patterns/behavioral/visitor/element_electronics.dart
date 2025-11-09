import 'element.dart';
import 'visitor.dart';

class Electronics implements Element {
  final String name;
  final double unitPrice;
  int qty;
  final bool fragile;

  Electronics(this.name, this.unitPrice, this.qty, [this.fragile = true]);

  @override
  void accept(Visitor v) => v.visitElectronics(this);
}
