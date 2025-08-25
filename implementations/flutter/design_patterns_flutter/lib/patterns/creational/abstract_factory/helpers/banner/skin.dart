import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/banner/skin.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

Skin skin(Variant v) {
  switch (v) {
    case Variant.success:
      return Skin(
        Colors.green.shade50,
        Colors.green.shade200,
        Colors.green.shade500,
        Colors.green.shade600.withOpacity(.10),
        'Success',
      );
    case Variant.alert:
      return Skin(
        Colors.red.shade50,
        Colors.red.shade200,
        Colors.red.shade500,
        Colors.red.shade600.withOpacity(.10),
        'Alert',
      );
    case Variant.informative:
      return Skin(
        Colors.blue.shade50,
        Colors.blue.shade200,
        Colors.blue.shade500,
        Colors.blue.shade600.withOpacity(.10),
        'Information',
      );
    case Variant.warning:
      return Skin(
        Colors.yellow.shade50,
        Colors.yellow.shade200,
        Colors.yellow.shade500,
        Colors.yellow.shade600.withOpacity(.10),
        'Warning',
      );
  }
}
