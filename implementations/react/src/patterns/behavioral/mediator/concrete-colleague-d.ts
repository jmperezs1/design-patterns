import { Colleague } from "./colleague";

export class ClearButton extends Colleague {
  operationD() {
    this.m.notify(this, "D:CLEAR_ALL");
  }
}