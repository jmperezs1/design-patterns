import type { TicketContext } from "./context";
import { InProgressState } from "./progress-state";
import { TicketState } from "./state";

export class NewState extends TicketState {
  private ctx: TicketContext;
  constructor(ctx: TicketContext) {
    super();
    this.ctx = ctx;
  }
  handleRequest() {
    this.ctx.commitDraft();
    this.ctx.setState(new InProgressState(this.ctx));
  }
}