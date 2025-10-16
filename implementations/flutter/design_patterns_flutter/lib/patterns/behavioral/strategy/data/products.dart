class Product {
  final String id;
  final String name;
  final double baseUnitPrice;
  final String imageUrl;
  final String? description;

  const Product({
    required this.id,
    required this.name,
    required this.baseUnitPrice,
    required this.imageUrl,
    this.description,
  });
}

const products = <Product>[
  Product(
    id: 'p1',
    name: 'Wireless Headphones',
    baseUnitPrice: 120,
    imageUrl: 'https://picsum.photos/seed/headphones/640/360',
    description: 'Bluetooth 5.3, 30h battery',
  ),
  Product(
    id: 'p2',
    name: '4K Monitor 27”',
    baseUnitPrice: 399,
    imageUrl: 'https://picsum.photos/seed/monitor/640/360',
    description: 'IPS, 144Hz, HDR',
  ),
  Product(
    id: 'p3',
    name: 'Mechanical Keyboard',
    baseUnitPrice: 89,
    imageUrl: 'https://picsum.photos/seed/keyboard/640/360',
    description: 'Hot-swappable switches',
  ),
];
