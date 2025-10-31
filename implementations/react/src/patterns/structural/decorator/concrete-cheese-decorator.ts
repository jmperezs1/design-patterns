import { BurgerDecorator } from "./interface-decorator";

export class Cheese extends BurgerDecorator {
  getDescription() { return `${this.wrappee.getDescription()} + queso`; }
  getCost() { return this.wrappee.getCost() + 0.75; }
}