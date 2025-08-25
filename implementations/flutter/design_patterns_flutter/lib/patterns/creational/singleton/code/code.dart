const String singletonCode = r"""
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class PokemonApi {
  PokemonApi._internal();
  static final PokemonApi _instance = PokemonApi._internal();
  factory PokemonApi() => _instance;
  static PokemonApi get instance => _instance;

  final String _baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  Future<Map<String, dynamic>> getPokemonData(String pokemonName) async {
    final key = pokemonName.toLowerCase().trim();
    if (key.isEmpty) {
      throw ArgumentError('pokemonName must not be empty');
    }

    final uri = Uri.parse('$_baseUrl$key');

    late http.Response res;
    try {
      res = await http.get(uri);
    } on SocketException catch (e) {
      // no internet / DNS issues
      throw HttpException('Network error while fetching $key: ${e.message}');
    }

    if (res.statusCode == 200) {
      final json = jsonDecode(res.body) as Map<String, dynamic>;
      return json;
    }

    if (res.statusCode == 429) {
      throw HttpException(
        'Rate limit exceeded for $key. Please wait before making more requests.',
      );
    }
    throw HttpException('Failed to fetch $key (status: ${res.statusCode})');
  }
}
""";
