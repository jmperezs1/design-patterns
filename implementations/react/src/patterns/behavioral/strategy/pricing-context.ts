import type { PricingStrategy } from "./strategy-interface";

export class PricingContext {
  private strategy: PricingStrategy;

  constructor(strategy: PricingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(s: PricingStrategy) {
    this.strategy = s;
  }

  getUnitPrice(base: number) {
    return this.strategy.getPrice(base, 1);
  }

  getTotal(base: number, qty: number) {
    return this.strategy.getPrice(base, qty);
  }
}
