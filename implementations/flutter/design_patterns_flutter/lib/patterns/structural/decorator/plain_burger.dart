import 'burger.dart';

class PlainBurger implements Burger {
  @override
  String getDescription() => 'Hamburguesa';

  @override
  double getCost() => 4.50;
}
