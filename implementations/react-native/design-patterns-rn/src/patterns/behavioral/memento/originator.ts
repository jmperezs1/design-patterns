import { EditorMemento } from './memento';

export class EditorOriginator {
  private text = '';

  setText(t: string) { this.text = t; }
  getText() { return this.text; }

  createMemento(): EditorMemento {
    return new EditorMemento(this.text);
  }

  setMemento(m: EditorMemento) {
    this.text = m.getState().text;
  }
}
