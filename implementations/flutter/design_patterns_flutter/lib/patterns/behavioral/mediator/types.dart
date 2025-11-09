class Item {
  final String id;
  final String name;
  final String category; // 'books' | 'tech' | 'home'
  Item({required this.id, required this.name, required this.category});
}

List<Item> makeDataset() => [
  Item(id: '1', name: 'Patrones de Diseño', category: 'books'),
  Item(id: '2', name: 'JavaScript Avanzado', category: 'books'),
  Item(id: '3', name: 'Teclado Mecánico', category: 'tech'),
  Item(id: '4', name: 'Monitor 4K', category: 'tech'),
  Item(id: '5', name: 'Sofá Minimalista', category: 'home'),
  Item(id: '6', name: 'Lámpara de Escritorio', category: 'home'),
  Item(id: '7', name: 'Aprendiendo Flutter', category: 'books'),
  Item(id: '8', name: 'Auriculares Inalámbricos', category: 'tech'),
  Item(id: '9', name: 'Alfombra Nórdica', category: 'home'),
  Item(id: '10', name: 'Fundamentos de UX', category: 'books'),
];
