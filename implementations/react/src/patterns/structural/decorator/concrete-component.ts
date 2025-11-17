import type { Burger } from "./interface-component";


/**
 *  * Componente concreto que representa una hamburguesa simple.
 */
export class PlainBurger implements Burger {
  getDescription() { return "Hamburguesa"; }
  getCost() { return 4.50; }
}
