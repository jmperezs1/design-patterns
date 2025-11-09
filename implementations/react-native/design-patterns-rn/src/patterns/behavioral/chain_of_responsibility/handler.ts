import type { HandleResult, Ticket } from './types';

export interface Handler {
  setNext(h: Handler): Handler;
  handle(req: Ticket, trail?: string[]): HandleResult;
}
