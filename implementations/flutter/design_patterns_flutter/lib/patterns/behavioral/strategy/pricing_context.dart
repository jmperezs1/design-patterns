import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategy.dart';

class PricingContext {
  PricingStrategy strategy;
  PricingContext(this.strategy);

  void setStrategy(PricingStrategy s) => strategy = s;

  double getUnitPrice(double base) => strategy.getPrice(base, 1);
  double getTotal(double base, int qty) => strategy.getPrice(base, qty);
}
