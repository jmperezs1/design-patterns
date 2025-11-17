import { BurgerDecorator } from "./interface-decorator";


/**
 * Decorador concreto que añade una porción extra de carne a una hamburguesa.
 */
export class DoublePatty extends BurgerDecorator {
  getDescription() { return `${this.wrappee.getDescription()} + carne extra`; }
  getCost() { return this.wrappee.getCost() + 2.20; }
}