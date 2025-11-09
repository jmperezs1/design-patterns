import type { Product } from './type/type';

export interface ProductService {
  getProduct(id: string): Promise<Product>;
}
