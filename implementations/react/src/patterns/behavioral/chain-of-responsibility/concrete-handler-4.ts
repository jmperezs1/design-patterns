import { SupportHandler } from "./base-handler";
import { rank } from "./helpers/rank";
import type { HandleResult, Ticket } from "./types/types";

export class SoporteNivel2 extends SupportHandler {
  handle(req: Ticket, trail: string[] = []): HandleResult {
    this.push(trail);
    if (req.category === "technical" && rank[req.severity] >= rank["medium"]) {
      return { handledBy: "SoporteNivel2", message: "Asignado a ingeniero de Nivel 2.", trail };
    }
    return super.handle(req, trail);
  }
}