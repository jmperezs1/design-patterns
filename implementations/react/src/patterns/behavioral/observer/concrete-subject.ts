import type { Observer } from "./observer";
import type { Subject } from "./subject";
import type { Quote } from "./types/type";

export class MarketDataHub implements Subject<Quote> {
  private observers = new Set<Observer<Quote>>();
  private timer?: number;

  addObserver(o: Observer<Quote>) { this.observers.add(o); }
  removeObserver(o: Observer<Quote>) { this.observers.delete(o); }
  notifyObservers(d: Quote) { for (const o of this.observers) o.update(d); }

  start(symbols = ["AAPL", "MSFT", "NVDA", "BTC-USD"]) {
    if (this.timer) return;
    this.timer = window.setInterval(() => {
      const s = symbols[Math.floor(Math.random() * symbols.length)];
      const q: Quote = { symbol: s, price: +(50 + Math.random() * 400).toFixed(2), ts: Date.now() };
      this.notifyObservers(q);
    }, 600);
  }
  stop() { if (this.timer) { clearInterval(this.timer); this.timer = undefined; } }
}