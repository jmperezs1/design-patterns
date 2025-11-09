import 'burger_decorator.dart';

class DoublePattyDecorator extends BurgerDecorator {
  DoublePattyDecorator(super.wrappee);

  @override
  String getDescription() => '${wrappee.getDescription()} + carne extra';

  @override
  double getCost() => wrappee.getCost() + 2.20;
}
