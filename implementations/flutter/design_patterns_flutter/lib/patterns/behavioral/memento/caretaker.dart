import 'memento.dart';
import 'originator.dart';

class EditorCaretaker {
  final EditorOriginator originator;
  final List<EditorMemento> _undoStack = [];
  final List<EditorMemento> _redoStack = [];

  EditorCaretaker(this.originator) {
    checkpoint('Initial');
  }

  void checkpoint([String? _label]) {
    _undoStack.add(originator.createMemento());
    _redoStack.clear();
  }

  bool canUndo() => _undoStack.length > 1;
  bool canRedo() => _redoStack.isNotEmpty;

  void undo() {
    if (!canUndo()) return;
    final current = _undoStack.removeLast();
    _redoStack.add(current);
    final previous = _undoStack.last;
    originator.setMemento(previous);
  }

  void redo() {
    if (!canRedo()) return;
    final next = _redoStack.removeLast();
    _undoStack.add(next);
    originator.setMemento(next);
  }

  List<Map<String, Object>> history() =>
      _undoStack.map((m) => m.getState()).toList(growable: false);
}
