import type { Burger } from "./interface-component";

/**
 * Decorador abstracto que implementa la interfaz Burger y contiene una referencia a un objeto Burger.
 */

export abstract class BurgerDecorator implements Burger {
  protected readonly wrappee: Burger;
  constructor(burger: Burger) { this.wrappee = burger; }

  getDescription() { return this.wrappee.getDescription(); }
  getCost() { return this.wrappee.getCost(); }
}
