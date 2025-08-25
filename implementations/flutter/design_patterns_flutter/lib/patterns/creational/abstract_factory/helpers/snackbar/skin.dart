import 'package:design_patterns_flutter/patterns/creational/abstract_factory/classes/snackbar/skin.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

SnackbarSkin skin(Variant v) {
  switch (v) {
    case Variant.success:
      return SnackbarSkin(
        Colors.green.shade50,
        Colors.green.shade900,
        Icons.check_circle_rounded,
      );
    case Variant.alert:
      return SnackbarSkin(
        Colors.red.shade50,
        Colors.red.shade900,
        Icons.cancel_rounded,
      );
    case Variant.informative:
      return SnackbarSkin(
        Colors.blue.shade50,
        Colors.blue.shade900,
        Icons.info_rounded,
      );
    case Variant.warning:
      return SnackbarSkin(
        Colors.yellow.shade50,
        Colors.yellow.shade900,
        Icons.warning_amber_rounded,
      );
  }
}
