import type { TicketContext } from "./context";
import { TicketState } from "./state";

export class ClosedState extends TicketState {
  private ctx: TicketContext;
  constructor(ctx: TicketContext) {
    super();
    this.ctx = ctx;
  }
  handleRequest() {
    if (!this.ctx.allDone()) {
      const remain = this.ctx.tasks.filter(t => !t.done).map(t => t.title).join(", ");
      throw new Error(`Cannot close. Remaining tasks: ${remain || "unknown"}`);
    }
    if (!this.ctx.closedAt) {
      this.ctx.closedAt = new Date();
    } else {
    }
  }
}