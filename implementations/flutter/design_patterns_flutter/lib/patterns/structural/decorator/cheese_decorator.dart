import 'burger_decorator.dart';

class CheeseDecorator extends BurgerDecorator {
  CheeseDecorator(super.wrappee);

  @override
  String getDescription() => '${wrappee.getDescription()} + queso';

  @override
  double getCost() => wrappee.getCost() + 0.75;
}
