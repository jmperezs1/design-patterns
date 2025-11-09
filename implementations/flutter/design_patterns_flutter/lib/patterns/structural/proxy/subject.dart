import 'product.dart';

abstract class ProductService {
  Future<Product> getProduct(String id);
}
