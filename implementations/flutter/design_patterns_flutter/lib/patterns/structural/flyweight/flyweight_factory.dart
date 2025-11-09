import 'package:flutter/material.dart';
import 'flyweight_interface.dart';
import 'concrete_flyweight.dart';

class BadgeFactory {
  final Map<String, FlyweightBadge> _cache = {};

  FlyweightBadge get(String key) {
    if (!_cache.containsKey(key)) {
      _cache[key] = _create(key);
    }
    return _cache[key]!;
  }

  int size() => _cache.length;

  FlyweightBadge _create(String key) {
    switch (key) {
      case 'pill':
        return BadgeFlyweight(
          borderRadius: 999,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          border: null,
          background: const Color(0xFF111111),
          fontSize: 12,
          fontWeight: FontWeight.w600,
        );
      case 'rounded-outline':
        return BadgeFlyweight(
          borderRadius: 8,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          border: Border.all(color: const Color(0xFF333333)),
          background: Colors.white,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        );
      case 'chip':
      default:
        return BadgeFlyweight(
          borderRadius: 14,
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 0),
          border: null,
          background: const Color(0xFFF5F5F5),
          fontSize: 12,
          fontWeight: FontWeight.w500,
        );
    }
  }
}
