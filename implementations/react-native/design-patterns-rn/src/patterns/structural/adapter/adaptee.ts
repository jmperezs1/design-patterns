export class Adaptee {
  async specificRequest(): Promise<string> {
    // Simula una API que devuelve CSV
    return 'id,name,email\n1,Juan Perez,juanperez@example.com\n2,Mario,mario@example.com\n3,Camila,camila@example.com';
  }
}
