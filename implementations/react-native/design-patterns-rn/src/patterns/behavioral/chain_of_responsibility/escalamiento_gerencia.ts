import { SupportHandler } from './base_handler';
import type { HandleResult, Ticket } from './types';

export class EscalamientoGerencia extends SupportHandler {
  handle(_req: Ticket, trail: string[] = []): HandleResult {
    this.push(trail);
    return { handledBy: 'EscalamientoGerencia', message: 'Escalado al Gerente de Guardia.', trail };
  }
}
