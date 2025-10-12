import 'package:design_patterns_flutter/patterns/creational/abstract_factory/template/screen.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/template/screen.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/template/screen.dart';
import 'package:flutter/widgets.dart';

class PatternEntry {
  final String id;
  final String name;
  final String category;
  // The builder must return a full screen/widget that contains the PatternTemplate
  final WidgetBuilder builder;

  const PatternEntry({
    required this.id,
    required this.name,
    required this.category,
    required this.builder,
  });
}

final patterns = <PatternEntry>[
  PatternEntry(
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    builder: (_) => const FactoryScreen(),
  ),
  PatternEntry(
    id: 'abstract_factory',
    name: "Abstract Factory",
    category: "Creational",
    builder: (_) => const AbstractFactoryScreen(),
  ),
  PatternEntry(
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    builder: (_) => const SingletonScreen(),
  ),
  PatternEntry(
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    builder: (_) => const Placeholder(),
  ),
];
