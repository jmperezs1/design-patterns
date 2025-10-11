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
