import type { Burger } from "./interface-component";

export class PlainBurger implements Burger {
  getDescription() { return "Hamburguesa"; }
  getCost() { return 4.50; }
}
