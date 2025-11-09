import type { JsonComponent } from './component';

export class PrimitiveNode implements JsonComponent {
  public keyLabel: string;
  private value: string | number | boolean | null;
  constructor(keyLabel: string, value: string | number | boolean | null) {
    this.keyLabel = keyLabel;
    this.value = value;
  }
  isLeaf() { return true; }
  getPreview() {
    if (this.value === null) return 'null';
    if (typeof this.value === 'string') return JSON.stringify(this.value);
    return String(this.value);
  }
  getChildren() { return []; }
}
