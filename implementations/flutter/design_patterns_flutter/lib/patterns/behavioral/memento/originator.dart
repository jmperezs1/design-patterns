import 'memento.dart';

class EditorOriginator {
  String _text = '';

  void setText(String t) => _text = t;
  String getText() => _text;

  EditorMemento createMemento() => EditorMemento(_text);
  void setMemento(EditorMemento m) {
    final s = m.getState();
    _text = (s['text'] as String?) ?? '';
  }
}
