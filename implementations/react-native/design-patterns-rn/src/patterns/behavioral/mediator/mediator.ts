export interface Mediator {
  notify(sender: unknown, event: string, payload?: unknown): void;
}
