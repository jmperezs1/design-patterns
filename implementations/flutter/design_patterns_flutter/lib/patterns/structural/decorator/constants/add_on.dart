import '../cheese_decorator.dart';
import '../bacon_decorator.dart';
import '../double_patty_decorator.dart';
import '../burger.dart';

class AddOnMeta {
  final String label;
  final Burger Function(Burger) build;

  const AddOnMeta({required this.label, required this.build});
}

/// Keys: 'cheese', 'bacon', 'double'
final Map<String, AddOnMeta> ADDONS = {
  'cheese': AddOnMeta(
    label: 'Queso (+\$0.75)',
    build: (b) => CheeseDecorator(b),
  ),
  'bacon': AddOnMeta(
    label: 'Tocineta (+\$1.10)',
    build: (b) => BaconDecorator(b),
  ),
  'double': AddOnMeta(
    label: 'Extra carne (+\$2.20)',
    build: (b) => DoublePattyDecorator(b),
  ),
};
