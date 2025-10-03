import type { PricingStrategy } from "./strategy-interface";

export class PlatinumClientPriceStrategy implements PricingStrategy {
    getPrice(baseUnitPrice: number, quantity: number): number {
        return baseUnitPrice * quantity * 0.95; 
    }
}