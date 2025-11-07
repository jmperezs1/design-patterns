import { Colleague } from "./colleague";
import type { Item } from "./types/type";

export class ResultsList extends Colleague {
  view: Item[] = [];
  operationB(show: Item[]) {
    this.view = show;
    this.m.notify(this, "B:RESULTS_RENDERED", show.length);
  }
}