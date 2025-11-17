import type { JsonComponent } from "./component";
import { buildNode } from "./helpers/node-builder";
import type { Json } from "./types/json";

/**
 * Representa un nodo compuesto que maneja arreglos en una estructura JSON.
 */

export class ArrayNode implements JsonComponent {
  public keyLabel: string;
  private kids: JsonComponent[];
  constructor(keyLabel: string, arr: Json[]) {
    this.keyLabel = keyLabel;
    this.kids = arr.map((v, i) => buildNode(String(i), v));
  }
  isLeaf() { return false; }
  getPreview() { return `[ … ${this.kids.length} ]`; }
  getChildren() { return this.kids; }
}