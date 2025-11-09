import { BurgerDecorator } from './interface-decorator';

export class Bacon extends BurgerDecorator {
  getDescription() { return `${this.wrappee.getDescription()} + tocineta`; }
  getCost() { return this.wrappee.getCost() + 1.10; }
}
