import { SupportHandler } from "./base-handler";
import type { HandleResult, Ticket } from "./types/types";

export class AutoResuelveFAQ extends SupportHandler {
  handle(req: Ticket, trail: string[] = []): HandleResult {
    this.push(trail);
    if (req.category === "billing" && req.severity === "low") {
      return {
        handledBy: "AutoResuelveFAQ",
        message: "Resuelto automáticamente con enlace a las FAQ de Facturación.",
        trail,
      };
    }
    return super.handle(req, trail);
  }
}
