import { BurgerDecorator } from "./interface-decorator";


/** * Decorador concreto que añade queso a una hamburguesa.
 */
export class Cheese extends BurgerDecorator {
  getDescription() { return `${this.wrappee.getDescription()} + queso`; }
  getCost() { return this.wrappee.getCost() + 0.75; }
}