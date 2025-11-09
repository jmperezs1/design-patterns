import 'dart:async';
import 'product.dart';
import 'subject.dart';

class HttpProductService implements ProductService {
  int _hits = 0;

  @override
  Future<Product> getProduct(String id) async {
    _hits++;
    await Future.delayed(const Duration(milliseconds: 600));
    return Product(id: id, name: 'Product $id', price: 10 + double.tryParse(id)! * 1.5);
  }

  int getNetworkHits() => _hits;
}
