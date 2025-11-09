import { HttpProductService } from './real-subject';
import type { ProductService } from './subject';
import type { Product } from './type/type';

export class CachingProductProxy implements ProductService {
  private real: HttpProductService;
  private cache = new Map<string, Product>();
  private inflight = new Map<string, Promise<Product>>();
  private hits = 0;
  private misses = 0;

  constructor(real = new HttpProductService()) {
    this.real = real;
  }

  async getProduct(id: string): Promise<Product> {
    const cached = this.cache.get(id);
    if (cached) {
      this.hits++;
      return cached;
    }

    const pending = this.inflight.get(id);
    if (pending) {
      this.hits++; // treat shared inflight as hit
      return pending;
    }

    this.misses++;
    const req = this.real.getProduct(id).then(p => {
      this.cache.set(id, p);
      this.inflight.delete(id);
      return p;
    }).catch(err => {
      this.inflight.delete(id);
      throw err;
    });

    this.inflight.set(id, req);
    return req;
  }

  getStats() {
    return {
      cacheHits: this.hits,
      cacheMisses: this.misses,
      networkCalls: this.real.getNetworkHits(),
      cacheSize: this.cache.size,
      inflight: this.inflight.size,
    };
  }

  clearCache() { this.cache.clear(); }
}
