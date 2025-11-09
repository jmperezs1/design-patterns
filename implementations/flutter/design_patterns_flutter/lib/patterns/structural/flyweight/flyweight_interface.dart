import 'package:flutter/widgets.dart';

/// Flyweight interface: operation receives extrinsic state and returns a Widget to render.
abstract class FlyweightBadge {
  Widget operation({
    required String text,
    required double x,
    required double y,
    required String color,
  });
}
