import { ClosedState } from "./closed-state";
import type { TicketContext } from "./context";
import { TicketState } from "./state";

export class InProgressState extends TicketState {
  private ctx: TicketContext;
  constructor(ctx: TicketContext) {
    super();
    this.ctx = ctx;
  }
  handleRequest() {
    const task = this.ctx.checkNextTask();
    if (task) {
      if (this.ctx.allDone()) {
        this.ctx.setState(new ClosedState(this.ctx));
      }
    } else {
      this.ctx.setState(new ClosedState(this.ctx));
    }
  }
}