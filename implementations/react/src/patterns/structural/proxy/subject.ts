import type { Product } from "./type/type";

/**
 * La interfaz Subject declara los métodos que serán implementados tanto por el
 */
export interface ProductService {
  getProduct(id: string): Promise<Product>;
}
