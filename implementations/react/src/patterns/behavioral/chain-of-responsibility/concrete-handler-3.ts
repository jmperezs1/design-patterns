import { SupportHandler } from "./base-handler";
import { rank } from "./helpers/rank";
import type { HandleResult, Ticket } from "./types/types";

export class SoporteNivel1 extends SupportHandler {
  handle(req: Ticket, trail: string[] = []): HandleResult {
    this.push(trail);
    if (rank[req.severity] <= rank["medium"]) {
      return { handledBy: "SoporteNivel1", message: "Atendido por Soporte Nivel 1.", trail };
    }
    return super.handle(req, trail);
  }
}