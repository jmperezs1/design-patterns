import 'package:design_patterns_flutter/patterns/creational/abstract_factory/abstract_factory_demo.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/code/code.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/code/demo.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/code/summary.dart';
import 'package:design_patterns_flutter/patterns/creational/factory/factory_demo.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/code/code.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/code/summary.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/code/usage.dart';
import 'package:design_patterns_flutter/patterns/creational/singleton/singleton_demo.dart';
import 'package:flutter/widgets.dart';

class CodeSnippet {
  final String title;
  final String code;
  final String language;
  const CodeSnippet({
    required this.title,
    required this.code,
    this.language = 'dart',
  });
}

class PatternEntry {
  final String id;
  final String name;
  final String category;
  final WidgetBuilder builder;
  final String? markdown;
  final List<CodeSnippet> codeSnippets;

  const PatternEntry({
    required this.id,
    required this.name,
    required this.category,
    required this.builder,
    this.markdown,
    this.codeSnippets = const [],
  });
}

final patterns = <PatternEntry>[
  PatternEntry(
    id: 'factory',
    name: 'Factory',
    category: 'Creational',
    builder: (_) => const FactoryDemo(),
    markdown: factorySummary,
    codeSnippets: [
      CodeSnippet(
        title: 'factory.dart',
        code: kFactorySource,
        language: 'dart',
      ),
      CodeSnippet(
        title: 'factory_demo.dart',
        code: factoryDemo,
        language: 'dart',
      ),
    ],
  ),
  PatternEntry(
    id: 'abstract_factory',
    name: "Abstract Factory",
    category: "Creational",
    builder: (_) => const NotificationsDualDemo(),
    markdown: '## Abstract Factory\nBreve explicación y diagrama…',
  ),
  PatternEntry(
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    builder: (_) => const SingletonDemo(),
    markdown: singletonSummary,
    codeSnippets: [
      CodeSnippet(title: 'singleton.dart', code: singletonCode),
      CodeSnippet(title: 'singleton_usage.dart', code: singletonUsage),
    ],
  ),
  PatternEntry(
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    builder: (_) => const Placeholder(),
    markdown: '## Observer\nNotas y casos de uso…',
  ),
];
