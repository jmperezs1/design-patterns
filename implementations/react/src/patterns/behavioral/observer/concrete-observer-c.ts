import type { Observer } from "./observer";
import type { Quote } from "./types/type";

export type TickerEntry = { price: number; ts: number; direction: "up" | "down" | "flat" };

/**
 * Concrete Observer que mantiene un registro actualizado del precio y la dirección de múltiples acciones.
 */

export class TickerSnapshot implements Observer<Quote> {
  public data = new Map<string, TickerEntry>();

  update(q: Quote): void {
    const prev = this.data.get(q.symbol);
    const direction: TickerEntry["direction"] = !prev
      ? "flat"
      : q.price > prev.price
        ? "up"
        : q.price < prev.price
          ? "down"
          : "flat";
    this.data.set(q.symbol, { price: q.price, ts: q.ts, direction });
  }
}
