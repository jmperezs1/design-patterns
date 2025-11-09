class EditorMemento {
  final String text;
  final DateTime createdAt;
  EditorMemento(this.text, [DateTime? created])
    : createdAt = created ?? DateTime.now();

  Map<String, Object> getState() => {'text': text, 'createdAt': createdAt};
}
