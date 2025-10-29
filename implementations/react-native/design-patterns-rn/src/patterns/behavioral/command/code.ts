import type { CodeSnippet } from '../../../registry/types';

export const commandCodeSnippets: CodeSnippet[] = [
  { title: 'command.ts', language: 'ts', code: `export interface Command { execute(arg?: string): void }` },
  { title: 'receiver.ts', language: 'ts', code: `export class Receiver {
  private items = new Map<string, number>();
  addItem(item: string) { this.items.set(item, (this.items.get(item) ?? 0) + 1); }
  removeItem(item: string) {
    const cur = this.items.get(item) ?? 0;
    if (cur <= 1) this.items.delete(item); else this.items.set(item, cur - 1);
  }
  clearItems() { this.items.clear(); }
  list(): Array<{ key: string; qty: number }> { return Array.from(this.items.entries()).map(([key, qty]) => ({ key, qty })); }
}` },
  { title: 'add_item_command.ts', language: 'ts', code: `export class AddItemCommand implements Command {
  constructor(private device: Receiver) {}
  execute(item?: string): void { if (item) this.device.addItem(item); }
}` },
  { title: 'remove_item_command.ts', language: 'ts', code: `export class RemoveItemCommand implements Command {
  constructor(private device: Receiver) {}
  execute(item?: string): void { if (item) this.device.removeItem(item); }
}` },
  { title: 'clear_items_command.ts', language: 'ts', code: `export class ClearItemsCommand implements Command {
  constructor(private device: Receiver) {}
  execute(): void { this.device.clearItems(); }
}` },
  { title: 'invoker.ts', language: 'ts', code: `export class Invoker {
  constructor(public command: Command) {}
  setCommand(c: Command) { this.command = c; }
  execute(item?: string) { this.command.execute(item); }
}` },
];
