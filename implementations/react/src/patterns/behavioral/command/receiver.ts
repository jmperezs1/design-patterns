export class Receiver {
  private items: Map<string, number> = new Map();

  addItem(item: string) {
    this.items.set(item, (this.items.get(item) || 0) + 1);
  }

  removeItem(item: string) {
    const cur = this.items.get(item) ?? 0;
    if (cur <= 1) this.items.delete(item);
    else this.items.set(item, cur - 1);
  }

  clearItems() {
    this.items.clear();
  }

  // helpers for UI
  list(): Array<{ name: string; qty: number }> {
    return [...this.items.entries()].map(([name, qty]) => ({ name, qty }));
  }
  count(item: string): number {
    return this.items.get(item) ?? 0;
  }
  size(): number {
    return this.items.size;
  }
}
