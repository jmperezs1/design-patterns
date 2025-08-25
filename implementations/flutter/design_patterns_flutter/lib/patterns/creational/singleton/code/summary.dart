const String singletonSummary = '''
Este módulo demuestra el patrón de diseño **Singleton** aplicado a una API de datos en Flutter.
La clase `PokemonApi` garantiza que **exista una sola instancia** del servicio en toda la aplicación,
proporcionando un punto de acceso global mediante `PokemonApi.instance`. El constructor privado `PokemonApi._internal()` previene la creación directa de instancias,
mientras que el miembro estático `instance` devuelve siempre la misma. Esta implementación encapsula la
comunicación con **PokeAPI**, asegurando un punto de acceso consistente y controlado a los datos de
Pokémon en toda la app.
  
Para **utilizar** este singleton en la capa de UI, puedes apoyarte en un `FutureBuilder` que gestione
los estados de *carga*, *éxito* y *error*. Por ejemplo, `PokemonCard(name: 'pikachu')` consulta
`PokemonApi.instance.getPokemonData(name)` y pinta el resultado sin duplicar lógica de red en los
widgets. La ventaja es que la recuperación de datos permanece centralizada en el singleton y la UI
solo se encarga de renderizar.
''';
