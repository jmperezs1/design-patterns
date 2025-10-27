export class Receiver {
  private items = new Map<string, number>();
  addItem(item: string) { this.items.set(item, (this.items.get(item) ?? 0) + 1); }
  removeItem(item: string) {
    const cur = this.items.get(item) ?? 0;
    if (cur <= 1) this.items.delete(item); else this.items.set(item, cur - 1);
  }
  clearItems() { this.items.clear(); }
  list(): Array<{ key: string; qty: number }> { return Array.from(this.items.entries()).map(([key, qty]) => ({ key, qty })); }
}
