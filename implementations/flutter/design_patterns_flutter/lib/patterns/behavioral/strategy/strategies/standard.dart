import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategy.dart';

class StandardClientPriceStrategy implements PricingStrategy {
  @override
  double getPrice(double baseUnitPrice, int quantity) =>
      baseUnitPrice * quantity;
}
