import type { TicketState } from './state';

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
