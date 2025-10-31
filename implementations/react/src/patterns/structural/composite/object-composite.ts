import type { JsonComponent } from "./component";
import { buildNode } from "./helpers/node-builder";
import type { Json } from "./types/json";

export class ObjectNode implements JsonComponent {
  private kids: JsonComponent[];
  public keyLabel: string;
  constructor(keyLabel: string, obj: { [k: string]: Json }) {
    this.keyLabel = keyLabel;
    this.kids = Object.entries(obj).map(([k, v]) => buildNode(k, v));
  }
  isLeaf() { return false; }
  getPreview() { return `{… ${this.kids.length} }`; }
  getChildren() { return this.kids; }
}