import type { Command } from './command';
import type { Receiver } from './receiver';

export class RemoveItemCommand implements Command {
  constructor(private device: Receiver) {}
  execute(item?: string): void { if (item) this.device.removeItem(item); }
}
