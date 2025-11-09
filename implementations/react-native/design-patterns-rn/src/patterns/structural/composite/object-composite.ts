import type { JsonComponent } from './component';

export class ObjectNode implements JsonComponent {
  public keyLabel: string;
  private children: JsonComponent[];
  constructor(keyLabel: string, children: JsonComponent[]) {
    this.keyLabel = keyLabel;
    this.children = children;
  }
  isLeaf() { return false; }
  getPreview() { return `{${this.children.length}}`; }
  getChildren() { return this.children; }
}
