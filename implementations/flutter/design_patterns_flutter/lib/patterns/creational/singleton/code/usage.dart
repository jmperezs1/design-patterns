const String singletonUsage = r"""
void main() async {
  final api = PokemonApi.instance;
  final data = await api.getPokemonData('pikachu');
  print(data);
}
""";
