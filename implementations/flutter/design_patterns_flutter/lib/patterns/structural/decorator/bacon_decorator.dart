import 'burger_decorator.dart';

class BaconDecorator extends BurgerDecorator {
  BaconDecorator(super.wrappee);

  @override
  String getDescription() => '${wrappee.getDescription()} + tocineta';

  @override
  double getCost() => wrappee.getCost() + 1.10;
}
