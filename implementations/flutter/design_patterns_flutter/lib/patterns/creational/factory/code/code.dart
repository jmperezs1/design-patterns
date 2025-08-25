const String kFactorySource = r"""
import 'package:design_patterns_flutter/patterns/creational/factory/classes/style.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/variants/variant.dart';
import 'package:flutter/material.dart';

Widget createWrapper(Variant variant, Widget child) {
  late Style style;

  if (variant == Variant.success) {
    style = Style(
      Colors.green.shade100,
      Colors.green.shade800,
      Icons.check_circle_rounded,
    );
  } else if (variant == Variant.alert) {
    style = Style(
      Colors.red.shade100,
      Colors.red.shade800,
      Icons.cancel_rounded,
    );
  } else if (variant == Variant.informative) {
    style = Style(
      Colors.blue.shade100,
      Colors.blue.shade800,
      Icons.info_rounded,
    );
  } else if (variant == Variant.warning) {
    style = Style(
      Colors.yellow.shade100,
      Colors.yellow.shade800,
      Icons.warning_amber_rounded,
    );
  } else {
    style = Style(
      Colors.grey.shade100,
      Colors.grey.shade800,
      Icons.info_rounded,
    );
  }

  return Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: style.bg,
      borderRadius: BorderRadius.circular(12),
      border: Border.all(color: style.accent.withOpacity(.5)),
    ),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(style.icon, color: style.accent),
        const SizedBox(width: 8),
        Expanded(child: child),
      ],
    ),
  );
}
""";
