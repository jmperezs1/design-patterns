import { SupportHandler } from './base_handler';
import type { HandleResult, Ticket } from './types';

export class EquipoSeguridad extends SupportHandler {
  handle(req: Ticket, trail: string[] = []): HandleResult {
    this.push(trail);
    if (req.category === 'security') {
      return {
        handledBy: 'EquipoSeguridad',
        message: 'Derivado a Seguridad (SLA 1h).',
        trail,
      };
    }
    return super.handle(req, trail);
  }
}
