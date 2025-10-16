import 'package:design_patterns_flutter/patterns/creational/abstract_factory/template/screen.dart';
import 'package:design_patterns_flutter/patterns/creational/builder/template/screen.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/template/screen.dart';
import 'package:design_patterns_flutter/patterns/creational/prototype/template/screen.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/template/screen.dart';
import 'package:flutter/widgets.dart';
import 'package:design_patterns_flutter/patterns/behavioral/command/template/screen.dart';
import 'package:design_patterns_flutter/patterns/behavioral/state/template/screen.dart';
import 'package:design_patterns_flutter/patterns/behavioral/strategy/template/screen.dart';

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
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    builder: (_) => const BuilderScreen(),
  ),
  PatternEntry(
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    builder: (_) => const FactoryScreen(),
  ),
  PatternEntry(
    id: 'prototype',
    name: 'Prototype',
    category: 'Creational',
    builder: (_) => const PrototypeScreen(),
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
  PatternEntry(
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    builder: (_) => const CommandScreen(),
  ),
  PatternEntry(
    id: 'state',
    name: 'State',
    category: 'Behavioral',
    builder: (_) => const StateScreen(),
  ),
  PatternEntry(
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    builder: (_) => const StrategyScreen(),
  ),
];
