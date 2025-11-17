/**
 * Interfaz que define el comportamiento de una hamburguesa.
 */
export interface Burger {
  getDescription(): string;
  getCost(): number;
}
