import type { CodeSnippet } from '../../../registry/types';

export const observerCodeSnippets: CodeSnippet[] = [
  { title: 'subject.ts', language: 'ts', code: `import type { Observer } from './observer';\nexport interface Subject<T> { addObserver(o: Observer<T>): void; removeObserver(o: Observer<T>): void; notifyObservers(d: T): void; }` },
  { title: 'observer.ts', language: 'ts', code: `export interface Observer<T> { update(data: T): void; }` },
  { title: 'concrete-subject.ts', language: 'ts', code: `import type { Observer } from './observer';\nimport type { Subject } from './subject';\nimport type { Quote } from './types/type';\nexport class MarketDataHub implements Subject<Quote> {\n  private observers = new Set<Observer<Quote>>();\n  private timer: any;\n  addObserver(o: Observer<Quote>) { this.observers.add(o); }\n  removeObserver(o: Observer<Quote>) { this.observers.delete(o); }\n  notifyObservers(d: Quote) { for (const o of this.observers) o.update(d); }\n  start(symbols = ['AAPL','MSFT','NVDA','BTC-USD']) { if (this.timer) return; this.timer = setInterval(() => { const s = symbols[Math.floor(Math.random()*symbols.length)]; const q: Quote = { symbol: s, price: +(50 + Math.random()*400).toFixed(2), ts: Date.now() }; this.notifyObservers(q); }, 600); }\n  stop() { if (this.timer) { clearInterval(this.timer); this.timer = undefined; } }\n}` },
];
