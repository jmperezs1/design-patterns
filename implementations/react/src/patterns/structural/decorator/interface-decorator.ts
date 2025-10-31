import type { Burger } from "./interface-component";

export abstract class BurgerDecorator implements Burger {
  protected readonly wrappee: Burger;
  constructor(burger: Burger) { this.wrappee = burger; }

  getDescription() { return this.wrappee.getDescription(); }
  getCost() { return this.wrappee.getCost(); }
}
