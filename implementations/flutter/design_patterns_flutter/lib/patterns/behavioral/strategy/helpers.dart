import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategies/gold.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategies/platinum.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategies/standard.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategies/vip.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/strategy.dart';

enum ClientType { standard, gold, platinum, vip }

PricingStrategy makeStrategy(ClientType client) {
  switch (client) {
    case ClientType.gold:
      return GoldClientPriceStrategy();
    case ClientType.platinum:
      return PlatinumClientPriceStrategy();
    case ClientType.vip:
      return VIPClientPriceStrategy();
    case ClientType.standard:
      return StandardClientPriceStrategy();
  }
}

String currency(double v) => 'USD ${v.toStringAsFixed(2)}';
