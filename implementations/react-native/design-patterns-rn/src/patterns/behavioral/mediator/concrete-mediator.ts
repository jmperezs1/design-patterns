import type { Colleague } from './colleague';
import type { SearchBox } from './concrete-colleague-a';
import type { ResultsList } from './concrete-colleague-b';
import type { CategoryFilter } from './concrete-colleague-c';
import type { ClearButton } from './concrete-colleague-d';
import type { Mediator } from './mediator';
import type { Item } from './types/type';

export class ConcreteMediator implements Mediator {
  private onLog: (line: string) => void;
  private A: SearchBox;
  private B: ResultsList;
  private C: CategoryFilter;
  private D: ClearButton;
  private dataset: Item[];
  constructor(
    A: SearchBox,
    B: ResultsList,
    C: CategoryFilter,
    D: ClearButton,
    dataset: Item[],
    onLog?: (line: string) => void
  ) {
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.dataset = dataset;
    this.onLog = onLog ?? (() => {});
    A.setMediator(this); B.setMediator(this); C.setMediator(this); D.setMediator(this);
  }

  notify(sender: unknown, event: string, payload?: unknown): void {
    if (sender === this.A) this.reactOnA(event, payload as string);
    else if (sender === this.B) this.reactOnB(event, payload as number);
    else if (sender === this.C) this.reactOnC(event, payload as any);
    else if (sender === this.D) this.reactOnD(event);
  }

  private reactOnA(_: string, q: string) {
    this.onLog(`A → query="${q}"`);
    this.refreshResults();
  }
  private reactOnB(_: string, n: number) {
    this.onLog(`B → rendered ${n} items`);
  }
  private reactOnC(_: string, cat: 'all' | Item['category']) {
    this.onLog(`C → category=${cat}`);
    this.refreshResults();
  }
  private reactOnD(_: string) {
    this.onLog('D → clear all');
    this.A.value = '';
    this.C.value = 'all';
    this.refreshResults();
  }

  private refreshResults() {
    const q = this.A.value.trim().toLowerCase();
    const cat = this.C.value;
    const filtered = this.dataset.filter(it =>
      (cat === 'all' || it.category === cat) &&
      (q === '' || it.name.toLowerCase().includes(q))
    );
    this.B.operationB(filtered);
  }
}
