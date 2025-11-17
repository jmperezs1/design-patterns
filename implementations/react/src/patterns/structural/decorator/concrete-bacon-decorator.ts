import { BurgerDecorator } from "./interface-decorator";

/**
 * Decorador concreto que añade tocineta a una hamburguesa.
 */
export class Bacon extends BurgerDecorator {
  getDescription() { return `${this.wrappee.getDescription()} + tocineta`; }
  getCost() { return this.wrappee.getCost() + 1.10; }
}