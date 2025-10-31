import { BurgerDecorator } from "./interface-decorator";

export class DoublePatty extends BurgerDecorator {
  getDescription() { return `${this.wrappee.getDescription()} + carne extra`; }
  getCost() { return this.wrappee.getCost() + 2.20; }
}