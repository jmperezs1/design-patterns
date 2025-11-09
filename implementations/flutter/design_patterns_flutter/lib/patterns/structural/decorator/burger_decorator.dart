import 'burger.dart';

/// Base decorator that delegates to the wrapped Burger.
abstract class BurgerDecorator implements Burger {
  final Burger wrappee;

  BurgerDecorator(this.wrappee);

  @override
  String getDescription() => wrappee.getDescription();

  @override
  double getCost() => wrappee.getCost();
}
