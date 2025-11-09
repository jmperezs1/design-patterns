export interface Burger {
  getDescription(): string;
  getCost(): number;
}

export class PlainBurger implements Burger {
  getDescription() { return 'Hamburguesa'; }
  getCost() { return 4.5; }
}
