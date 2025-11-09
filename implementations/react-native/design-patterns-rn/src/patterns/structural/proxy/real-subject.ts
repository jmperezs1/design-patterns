import type { ProductService } from './subject';
import type { Product } from './type/type';

export class HttpProductService implements ProductService {
  private hits = 0;

  async getProduct(id: string): Promise<Product> {
    this.hits++;
    await sleep(600);
    return {
      id,
      name: `Product ${id}`,
      price: 10 + Number(id) * 1.5,
    };
  }

  getNetworkHits() { return this.hits; }
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
