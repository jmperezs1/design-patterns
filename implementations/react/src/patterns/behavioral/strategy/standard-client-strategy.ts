import type { PricingStrategy } from "./strategy-interface";

export class StandardClientPriceStrategy implements PricingStrategy {
  getPrice( baseUnitPrice: number, quantity: number): number {
    return baseUnitPrice * quantity;
  }
}