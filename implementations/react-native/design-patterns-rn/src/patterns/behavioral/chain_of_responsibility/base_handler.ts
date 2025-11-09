import type { Handler } from './handler';
import type { HandleResult, Ticket } from './types';

export abstract class SupportHandler implements Handler {
  protected next?: Handler;
  setNext(h: Handler) { this.next = h; return h; }

  handle(req: Ticket, trail: string[] = []): HandleResult {
    if (this.next) return this.next.handle(req, trail);
    return { handledBy: 'Unassigned', message: 'Escalado fuera de la cadena', trail };
  }

  protected push(trail: string[]) { trail.push((this as any).constructor.name); }
}
