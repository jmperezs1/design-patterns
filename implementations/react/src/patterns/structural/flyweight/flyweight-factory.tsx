import { BadgeFlyweight } from "./concrete-flyweight";
import type { FlyweightBadge } from "./flyweight-interface";

export class BadgeFactory {
  private cache = new Map<string, FlyweightBadge>();

  get(key: string): FlyweightBadge {
    if (!this.cache.has(key)) {
      const fw = this.create(key);
      this.cache.set(key, fw);
    }
    return this.cache.get(key)!;
  }

  size() {
    return this.cache.size;
  }

  private create(key: string): FlyweightBadge {
    switch (key) {
      case "pill":
        return new BadgeFlyweight({
          borderRadius: 999,
          padding: "2px 8px",
          background: "#111",
          fontSize: 12,
          fontFamily: "ui-sans-serif, system-ui",
          fontWeight: 600,
        });
      case "rounded-outline":
        return new BadgeFlyweight({
          borderRadius: 8,
          padding: "2px 8px",
          border: "1px solid #333",
          background: "#fff",
          fontSize: 12,
          fontFamily: "ui-sans-serif, system-ui",
          fontWeight: 600,
        });
      case "chip":
      default:
        return new BadgeFlyweight({
          borderRadius: 14,
          padding: "0px 10px",
          background: "#f5f5f5",
          fontSize: 12,
          fontFamily: "ui-sans-serif, system-ui",
          fontWeight: 500,
        });
    }
  }
}