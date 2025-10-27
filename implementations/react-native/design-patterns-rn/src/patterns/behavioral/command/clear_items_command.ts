import type { Command } from './command';
import type { Receiver } from './receiver';

export class ClearItemsCommand implements Command {
  constructor(private device: Receiver) {}
  execute(): void { this.device.clearItems(); }
}
