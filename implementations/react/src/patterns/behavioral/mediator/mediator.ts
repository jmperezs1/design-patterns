import type { Colleague } from "./colleague";

export interface Mediator {
  notify(sender: Colleague, event: string, payload?: unknown): void;
}