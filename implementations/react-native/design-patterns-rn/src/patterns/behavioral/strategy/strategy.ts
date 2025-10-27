export interface PricingStrategy { getPrice(baseUnitPrice: number, quantity: number): number }

export class StandardClientPriceStrategy implements PricingStrategy { getPrice(base: number, q: number) { return base * q; } }
export class GoldClientPriceStrategy implements PricingStrategy { getPrice(base: number, q: number) { return base * q * 0.9; } }
export class PlatinumClientPriceStrategy implements PricingStrategy { getPrice(base: number, q: number) { return base * q * 0.95; } }
export class VIPClientPriceStrategy implements PricingStrategy { getPrice(base: number, q: number) { return base * q * 0.8; } }

export class PricingContext {
  constructor(private strategy: PricingStrategy) {}
  setStrategy(s: PricingStrategy) { this.strategy = s; }
  getUnitPrice(base: number) { return this.strategy.getPrice(base, 1); }
  getTotal(base: number, qty: number) { return this.strategy.getPrice(base, qty); }
}
