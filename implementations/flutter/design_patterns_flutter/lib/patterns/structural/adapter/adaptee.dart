class Adaptee {
  Future<String> specificRequest() async {
    // Simula una API que devuelve CSV
    await Future<void>.delayed(const Duration(milliseconds: 300));
    return 'id,name,email\n1,Juan Perez,juanperez@example.com\n2,Mario,mario@example.com\n3,Camila,camila@example.com';
  }
}
