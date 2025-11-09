import 'dart:async';
import 'product.dart';
import 'subject.dart';
import 'real_subject.dart';

class CachingProductProxy implements ProductService {
  final HttpProductService _real;
  final Map<String, Product> _cache = {};
  final Map<String, Future<Product>> _inflight = {};
  int _hits = 0;
  int _misses = 0;

  CachingProductProxy([HttpProductService? real])
    : _real = real ?? HttpProductService();

  @override
  Future<Product> getProduct(String id) async {
    final cached = _cache[id];
    if (cached != null) {
      _hits++;
      return cached;
    }

    final pending = _inflight[id];
    if (pending != null) {
      _hits++; // treat shared inflight as hit
      return pending;
    }

    _misses++;
    final req = _real
        .getProduct(id)
        .then((p) {
          _cache[id] = p;
          _inflight.remove(id);
          return p;
        })
        .catchError((e) {
          _inflight.remove(id);
          throw e;
        });

    _inflight[id] = req;
    return req;
  }

  Map<String, dynamic> getStats() {
    return {
      'cacheHits': _hits,
      'cacheMisses': _misses,
      'networkCalls': _real.getNetworkHits(),
      'cacheSize': _cache.length,
      'inflight': _inflight.length,
    };
  }

  void clearCache() => _cache.clear();
}
