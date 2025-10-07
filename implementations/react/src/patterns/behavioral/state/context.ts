import { NewState } from "./new-state";
import type { TicketState } from "./state";

export class TicketContext {
  state: TicketState;

  title = "";
  tasks: Array<{ id: string; title: string; done: boolean }> = [];
  closedAt: Date | null = null;

  draftTitle = "";
  draftTasks: string[] = [];


  constructor() {
    this.state = new NewState(this);
  }

  setState(state: TicketState) {
    this.state = state;
  }

  request() {
    this.state.handleRequest();
  }


  
  commitDraft() {
    const t = this.draftTitle.trim();
    const list = this.draftTasks.map(s => s.trim()).filter(Boolean);
    if (!t) throw new Error("Title is required");
    if (list.length === 0) throw new Error("Add at least one task");
    this.title = t;
    this.tasks = list.map((txt, i) => ({ id: String(i + 1), title: txt, done: false }));
    this.closedAt = null;
  }
  checkNextTask() {
    const next = this.tasks.find(x => !x.done);
    if (!next) return null;
    next.done = true;
    return next;
  }
  allDone() {
    return this.tasks.length > 0 && this.tasks.every(x => x.done);
  }
  reset() {
    this.title = "";
    this.tasks = [];
    this.closedAt = null;
    this.draftTitle = "";
    this.draftTasks = [];
    this.setState(new NewState(this));
  }
}