import type { PricingStrategy } from "./strategy-interface";


export class VIPClientPriceStrategy implements PricingStrategy {
    getPrice(baseUnitPrice: number, quantity: number): number {
        return baseUnitPrice * quantity * 0.80; 
    }
}