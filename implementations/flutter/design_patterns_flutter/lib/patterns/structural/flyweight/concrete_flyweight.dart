import 'package:flutter/material.dart';
import 'flyweight_interface.dart';

class BadgeFlyweight implements FlyweightBadge {
  final double borderRadius;
  final EdgeInsets padding;
  final BoxBorder? border;
  final Color background;
  final double fontSize;
  final FontWeight fontWeight;

  BadgeFlyweight({
    required this.borderRadius,
    required this.padding,
    this.border,
    required this.background,
    required this.fontSize,
    required this.fontWeight,
  });

  @override
  Widget operation({
    required String text,
    required double x,
    required double y,
    required String color,
  }) {
    final textColor = _parseColor(color) ?? Colors.black;

    return Positioned(
      left: x,
      top: y,
      child: Container(
        padding: padding,
        decoration: BoxDecoration(
          color: background,
          border: border,
          borderRadius: BorderRadius.circular(borderRadius),
        ),
        child: Text(
          text,
          style: TextStyle(
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: textColor,
          ),
        ),
      ),
    );
  }

  Color? _parseColor(String hex) {
    try {
      var s = hex.replaceAll('#', '').padLeft(6, '0');
      return Color(int.parse('0xFF$s'));
    } catch (_) {
      return null;
    }
  }
}
