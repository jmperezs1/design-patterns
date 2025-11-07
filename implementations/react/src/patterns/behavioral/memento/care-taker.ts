import type { EditorMemento } from "./memento";
import type { EditorOriginator } from "./originator";

export class EditorCaretaker {
  private originator: EditorOriginator;
  private undoStack: EditorMemento[] = [];
  private redoStack: EditorMemento[] = [];

  constructor(originator: EditorOriginator) {
    this.originator = originator;
    this.checkpoint("Initial");
  }

  checkpoint(_label?: string) {
    this.undoStack.push(this.originator.createMemento());
    this.redoStack = [];
  }

  canUndo() { return this.undoStack.length > 1; } 
  canRedo() { return this.redoStack.length > 0; }

  undo() {
    if (!this.canUndo()) return;
    const current = this.undoStack.pop()!; 
    this.redoStack.push(current);
    const previous = this.undoStack[this.undoStack.length - 1];
    this.originator.setMemento(previous);
  }

  redo() {
    if (!this.canRedo()) return;
    const next = this.redoStack.pop()!;
    this.undoStack.push(next);
    this.originator.setMemento(next);
  }

  history() {
    return this.undoStack.map(m => m.getState());
  }
}