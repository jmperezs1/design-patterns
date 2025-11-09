import { BadgeFlyweight } from './concrete-flyweight';
import type { FlyweightBadge } from './flyweight-interface';

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
      case 'pill':
        return new BadgeFlyweight({
          borderRadius: 999,
          paddingHorizontal: 8,
          paddingVertical: 2,
          background: '#111',
          fontSize: 12,
          fontWeight: '600',
        });
      case 'rounded-outline':
        return new BadgeFlyweight({
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderWidth: 1,
          borderColor: '#333',
          background: '#fff',
          fontSize: 12,
          fontWeight: '600',
        });
      case 'chip':
      default:
        return new BadgeFlyweight({
          borderRadius: 14,
          paddingHorizontal: 10,
          paddingVertical: 0,
          background: '#f5f5f5',
          fontSize: 12,
          fontWeight: '500',
        });
    }
  }
}
