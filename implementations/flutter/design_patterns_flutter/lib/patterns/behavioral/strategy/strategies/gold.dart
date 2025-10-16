import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategy.dart';

class GoldClientPriceStrategy implements PricingStrategy {
  @override
  double getPrice(double baseUnitPrice, int quantity) =>
      baseUnitPrice * quantity * 0.9;
}
