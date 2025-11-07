import type { Visitor } from "./visitor";

export interface Element {
  accept(v: Visitor): void;
}