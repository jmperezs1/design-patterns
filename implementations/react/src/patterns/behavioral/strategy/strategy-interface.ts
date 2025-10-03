export interface PricingStrategy {
  getPrice(baseUnitPrice: number, quantity: number): number;
}