import { SupportHandler } from "./base-handler";
import type { HandleResult, Ticket } from "./types/types";

export class EscalamientoGerencia extends SupportHandler {
  handle(_req: Ticket, trail: string[] = []): HandleResult {
    this.push(trail);
    return { handledBy: "EscalamientoGerencia", message: "Escalado al Gerente de Guardia.", trail };
  }
}