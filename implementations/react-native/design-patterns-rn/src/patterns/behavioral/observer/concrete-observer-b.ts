import type { Observer } from './observer';
import type { Quote } from './types/type';

export class SimpleMovingAverage implements Observer<Quote> {
  private symbol: string;
  private window: number;
  private values: number[] = [];
  public average = 0;

  constructor(symbol: string, window = 5) {
    this.symbol = symbol;
    this.window = Math.max(1, window);
  }

  setSymbol(s: string) { this.symbol = s; this.values = []; this.average = 0; }
  setWindow(n: number) { this.window = Math.max(1, n); this.values = []; this.average = 0; }

  update(q: Quote): void {
    if (q.symbol !== this.symbol) return;
    this.values.push(q.price);
    if (this.values.length > this.window) this.values.shift();
    const sum = this.values.reduce((a, b) => a + b, 0);
    this.average = +(sum / this.values.length).toFixed(2);
  }
}
