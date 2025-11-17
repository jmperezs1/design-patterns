/**
 * El memento (Memento) almacena el estado interno del originador
 */

export class EditorMemento {
  readonly text: string;
  readonly createdAt: Date;

  constructor(text: string, createdAt = new Date()) {
    this.text = text;
    this.createdAt = createdAt;
  }

  getState() {
    return { text: this.text, createdAt: this.createdAt };
  }
}