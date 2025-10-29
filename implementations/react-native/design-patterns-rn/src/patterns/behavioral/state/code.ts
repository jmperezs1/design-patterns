import type { CodeSnippet } from '../../../registry/types';

export const stateCodeSnippets: CodeSnippet[] = [
  { title: 'state.ts', language: 'ts', code: `export interface TicketState {
  name: string;
  handleRequest(): void;
}
` },
  { title: 'context.ts', language: 'ts', code: `import { NewState } from './states';
import type { TicketState } from './state';

export class TicketContext {
  state: TicketState;
  title = '';
  tasks: Array<{ id: string; title: string; done: boolean }> = [];
  closedAt: Date | null = null;
  draftTitle = '';
  draftTasks: string[] = [];

  constructor() {
    // NewState will reference this context
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - NewState expects a context-like object
  this.state = new NewState(this);
  }

  setState(s: TicketState) { this.state = s; }
  request() { this.state.handleRequest(); }

  commitDraft() {
    const t = this.draftTitle.trim();
    const list = this.draftTasks.map((s) => s.trim()).filter(Boolean);
    if (!t) throw new Error('Title is required');
    if (list.length === 0) throw new Error('Add at least one task');
    this.title = t;
    this.tasks = list.map((txt, i) => ({ id: String(i + 1), title: txt, done: false }));
    this.closedAt = null;
  }
  checkNextTask() {
    const next = this.tasks.find((x) => !x.done);
    if (!next) return null;
    next.done = true;
    return next;
  }
  allDone() { return this.tasks.length > 0 && this.tasks.every((x) => x.done); }
  reset() {
    this.title = '';
    this.tasks = [];
    this.closedAt = null;
    this.draftTitle = '';
    this.draftTasks = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.setState(new NewState(this));
  }
}
` },
  { title: 'states.ts', language: 'ts', code: `import type { TicketState } from './state';

export class TicketContextRef {
  // Lightweight interface to avoid circular import at type-level
  commitDraft!: () => void;
  setState!: (s: TicketState) => void;
  checkNextTask!: () => { id: string; title: string; done: boolean } | null;
  allDone!: () => boolean;
  reset!: () => void;
  closedAt!: Date | null;
}

// Implementations expect a context-like object; actual TicketContext satisfies this shape
export class NewState implements TicketState {
  name = 'Nuevo';
  constructor(private ctx: TicketContextRef) {}
  handleRequest(): void {
    this.ctx.commitDraft();
    this.ctx.setState(new InProgressState(this.ctx));
  }
}

export class InProgressState implements TicketState {
  name = 'En progreso';
  constructor(private ctx: TicketContextRef) {}
  handleRequest(): void {
    const progressed = this.ctx.checkNextTask();
    if (!progressed) {
      throw new Error('No hay tareas pendientes');
    }
    if (this.ctx.allDone()) {
      this.ctx.closedAt = new Date();
      this.ctx.setState(new ClosedState(this.ctx));
    }
  }
}

export class ClosedState implements TicketState {
  name = 'Cerrado';
  constructor(private ctx: TicketContextRef) {}
  handleRequest(): void {
    this.ctx.reset();
  }
}
` },
];
