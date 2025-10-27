import type { Command } from './command';

export class Invoker {
  constructor(public command: Command) {}
  setCommand(c: Command) { this.command = c; }
  execute(item?: string) { this.command.execute(item); }
}
