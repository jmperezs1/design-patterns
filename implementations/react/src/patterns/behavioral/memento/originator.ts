import { EditorMemento } from "./memento";

/**
 * El originador (Originator) es el objeto cuyo estado queremos guardar
 */

export class EditorOriginator {
  private text = "";

  setText(t: string) { this.text = t; }
  getText() { return this.text; }

  // Crea un snapshot (memento) del estado actual
  createMemento(): EditorMemento {
    return new EditorMemento(this.text);
  }

  // Restaura un snapshot
  setMemento(m: EditorMemento) {
    this.text = m.getState().text;
  }
}