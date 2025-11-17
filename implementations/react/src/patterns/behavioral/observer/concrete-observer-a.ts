import type { Observer } from "./observer";
import type { Quote } from "./types/type";

/**
 * Concrete Observer que alerta cuando el precio de una acción supera un umbral definido.
 */

export class ThresholdAlert implements Observer<Quote> {
  public logs: string[] = [];
  private targetSymbol: string;
  private above: number;
  constructor(targetSymbol: string, above: number) {
    this.targetSymbol = targetSymbol;
    this.above = above;
  }

  setTargetSymbol(s: string) { this.targetSymbol = s; }
  setAbove(n: number) { this.above = n; }

  update(q: Quote): void {
    if (q.symbol === this.targetSymbol && q.price >= this.above) {
      this.logs.unshift(
        `[${new Date(q.ts).toLocaleTimeString()}] ${q.symbol} ≥ ${this.above} → ${q.price}`
      );
    }
  }
}